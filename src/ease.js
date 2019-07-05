import * as PIXI from 'pixi.js'
import Penner from 'penner'
import Events from 'eventemitter3'

import { EaseDisplayObject } from './easeDisplayObject'

const easeOptions = {
    duration: 1000,
    ease: Penner.easeInOutSine,
    useTicker: true,
    maxFrame: 1000 / 60
}

/**
 * Manages a group of eases
 * @extends EventEmitter
 * @example
 * import * as PIXI from 'pixi.js'
 * import { Ease, ease } from 'pixi-ease'
 *
 * const app = new PIXI.Application()
 * const test = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
 *
 * const move = ease.add(test, { x: 20, y: 15, alpha: 0.25 }, { reverse: true })
 * move.once('complete', () => console.log('move ease complete.'))
 *
 * test.generic = 25
 * const generic = ease.add(test, { generic: 0 }, { duration: 1500, ease: 'easeOutQuad' })
 * generic.on('each', () => console.log(test.generic))
 *
 * const secondEase = new Ease({ duration: 3000, ease: 'easeInBack' })
 * const test2 = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
 * test2.tint = 0x0000ff
 * secondEase.add(test2, { blend: [0xff0000, 0x00ff00], scale: 2 })
 */
export class Ease extends Events
{
    /**
     * @param {object} [options]
     * @param {number} [options.duration=1000] default duration if not set
     * @param {(string|function)} [options.ease=Penner.easeInOutSine] default ease function if not set (see {@link https://www.npmjs.com/package/penner} for names of easing functions)
     * @param {boolean} [options.useTicker=true] attach updates to a PIXI.Ticker
     * @param {PIXI.Ticker} [options.ticker=PIXI.ticker.shared || PIXI.Ticker.shared] which PIXI.Ticker to use
     * @param {number} [options.maxFrame=1000/60] maximum frame time (set to Infinity to ignore)
     * @fires Ease#complete
     * @fires Ease#each
     */
    constructor(options)
    {
        super()
        this.options = Object.assign({}, easeOptions, options)
        this.list = []
        this.waitRemoveEase = []
        this.waitRemoveAllEases = []
        this.empty = true
        if (this.options.useTicker === true)
        {
            // weird code to ensure pixi.js v4 support (which changed from PIXI.ticker.shared to PIXI.Ticker.shared)
            if (this.options.ticker)
            {
                this.ticker = this.options.ticker
            }
            else
            {
                // to avoid Rollup transforming our import, save pixi namespace in a variable
                // from here: https://github.com/pixijs/pixi.js/issues/5757
                const pixiNS = PIXI
                if (parseInt(/^(\d+)\./.exec(PIXI.VERSION)[1]) < 5)
                {
                    this.ticker = pixiNS.ticker.shared
                }
                else
                {
                    this.ticker = pixiNS.Ticker.shared
                }
            }
            this.ticker.add(this.update, this)
        }
        this.key = `__ease_${Ease.id++}`
    }

    /**
     * removes all eases and tickers
     */
    destroy()
    {
        this.removeAll(true)
        if (this.options.useTicker === true)
        {
            this.ticker.remove(this.update, this)
        }
    }

    /**
     * add animation(s) to a PIXI.DisplayObject element
     * @param {(PIXI.DisplayObject|PIXI.DisplayObject[])} element
     *
     * @param {object} params
     * @param {number} [params.x]
     * @param {number} [params.y]
     * @param {(PIXI.DisplayObject|PIXI.Point)} [params.position] changes both x and y
     * @param {number} [params.width]
     * @param {number} [params.height]
     * @param {number} [params.scale] changes both scale.x and scale.y
     * @param {number} [params.scaleX]
     * @param {number} [params.scaleY]
     * @param {number} [params.alpha]
     * @param {number} [params.rotation]
     * @param {(PIXI.DisplayObject|PIXI.Point)} [params.face] rotate the element to face a DisplayObject using the closest angle
     * @param {number} [params.skew] changes both skew.x and skew.y
     * @param {number} [params.skewX]
     * @param {number} [params.skewY]
     * @param {(number|number[])} [params.tint] cycle through colors - if number is provided then it cycles between current tint and number; if number[] is provided is cycles only between tints in the number[]
     * @param {(number|number[])} [params.blend] blend between colors - if number is provided then it blends current tint to number; if number[] is provided then it blends between the tints in the number[]
     * @param {number} [params.shake] moves
     * @param {number} [params.*] generic number parameter
     *
     * @param {object} [options]
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @param {number} [options.wait] wait this number of milliseconds before ease starts
     * @param {boolean} [options.removeExisting] removes existing eases on the element of the same type (including x,y/position, skewX,skewY/skew, scaleX,scaleY/scale)
     * @returns {(EaseDisplayObject|EaseDisplayObject[])}
     */
    add(element, params, options)
    {
        if (Array.isArray(element))
        {
            const easeDisplayObjects = []
            for (let i = 0; i < element.length; i++)
            {
                if (i === element.length - 1)
                {
                    easeDisplayObjects.push(this.add(element[i], params, options))
                }
                else
                {
                    easeDisplayObjects.push(this.add(element[i], params, options))
                }
            }
            return easeDisplayObjects
        }

        options = options || {}
        options.duration = typeof options.duration !== 'undefined' ? options.duration : this.options.duration
        options.ease = options.ease || this.options.ease

        if (typeof options.ease === 'string')
        {
            options.ease = Penner[options.ease]
        }
        let ease = element[this.key]
        if (ease)
        {
            if (!ease.connected)
            {
                this.list.push(element)
            }
        }
        else
        {
            ease = element[this.key] = new EaseDisplayObject(element, this)
            this.list.push(ease)
        }
        ease.add(params, options)
        this.empty = false
        return ease
    }

    /**
     * remove all eases from a DisplayObject
     * @param {PIXI.DisplayObject} object
     */
    removeAllEases(object)
    {
        if (this.inUpdate)
        {
            this.waitRemoveAllEases.push(object)
        }
        else
        {
            if (object[this.key])
            {
                const index = this.list.indexOf(object[this.key])
                if (index !== -1)
                {
                    this.list.splice(index, 1)
                }
                delete object[this.key]
            }
        }
    }

    /**
     * removes one or more eases from a DisplayObject
     * @param {PIXI.DisplayObject} object
     * @param {(string|string[])} param
     */
    removeEase(object, param)
    {
        if (this.inUpdate)
        {
            this.waitRemoveEase.push({ object, param })
        }
        else
        {
            const ease = object[this.key]
            if (ease)
            {
                if (Array.isArray(param))
                {
                    param.forEach(entry => ease.remove(entry))
                }
                else
                {
                    ease.remove(param)
                }
            }
        }
    }

    /**
     * remove all animations for all DisplayObjects
     * @param {boolean} [force] remove all eases even if called within update loop (setting this to true may cause unexpected problems)
     */
    removeAll(force)
    {
        if (!force && this.inUpdate)
        {
            this.waitRemoveAll = true
        }
        else
        {
            while (this.list.length)
            {
                const easeDisplayObject = this.list.pop()
                if (easeDisplayObject.element[this.key])
                {
                    delete easeDisplayObject.element[this.key]
                }
            }
        }
    }

    /**
     * update frame; this is called automatically if options.useTicker !== false
     * @param {number} elapsed time in ms
     */
    update()
    {
        if (!this.empty)
        {
            this.inUpdate = true
            const elapsed = Math.max(this.ticker.elapsedMS, this.options.maxFrame)
            for (let i = 0, _i = this.list.length; i < _i; i++)
            {
                if (this.list[i].update(elapsed))
                {
                    this.list.splice(i, 1)
                    i--
                    _i--
                }
            }
            this.emit('each', this)
            if (this.list.length === 0)
            {
                this.empty = true
                this.emit('complete', this)
            }
            this.inUpdate = false
            while (this.waitRemoveEase.length)
            {
                const remove = this.waitRemoveEase.pop()
                this.removeEase(remove.object, remove.param)
            }
            while (this.waitRemoveAllEases.length)
            {
                this.removeAllEases(this.waitRemoveAllEases.pop())
            }
            if (this.waitRemoveAll)
            {
                this.removeAll()
                this.waitRemoveAll = false
            }
        }
    }

    /**
     * number of elements being eased
     * @returns {number}
     */
    countElements()
    {
        return this.list.length
    }

    /**
     * number of active animations across all elements
     * @returns {number}
     */
    countRunning()
    {
        let count = 0
        for (let entry of this.list)
        {
            count += entry.count
        }
        return count
    }

    /**
     * default duration for eases.add() (only applies to newly added eases)
     * @type {number}
     */
    set duration(duration)
    {
        this.options.duration = duration
    }
    get duration()
    {
        return this.options.duration
    }

    /**
     * default ease for eases.add() (only applies to newly added eases)
     * @type {(string|Function)}
     */
    set ease(ease)
    {
        this.options.ease = ease
    }
    get ease()
    {
        return this.options.ease
    }
}

// manages the ids used to define the DisplayObject ease variable (enabled multiple eases attached to the same object)
Ease.id = 0

/**
 * default instantiated Ease class
 * @type {Ease}
 */
export let ease = new Ease()

Ease.ease = ease

export class List
{
    constructor()
    {
        console.warn('Ease.List was deprecated. Use new Ease() instead.')
    }
}

/**
 * fires when there are no more eases
 * @event Ease#complete
 * @type {Ease}
 */

 /**
 * fires on each loop when there are eases running
 * @event Ease#each
 * @type {Ease}
 */
