import Penner from 'penner'
import Events from 'eventemitter3'

import { Easing } from './easing'

const easeOptions = {
    duration: 1000,
    ease: Penner.easeInOutSine,
    maxFrame: 1000 / 60,
    ticker: null,
    useRAF: true
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
     * @param {boolean} [option.useRAF=true] attach to a requestAnimationFrame listener
     * @param {PIXI.Ticker} [options.ticker] attach to a PIXI.Ticker instead of RAF
     * @param {number} [options.maxFrame=1000/60] maximum frame time (set to Infinity to ignore); only used if useTicker = true
     * @fires Ease#complete
     * @fires Ease#each
     */
    constructor(options)
    {
        super()
        this.options = Object.assign({}, easeOptions, options)
        this.easings = []
        this.empty = true
        if (this.options.ticker)
        {
            this.options.ticker.add(this.update, this)
        }
    }

    /**
     * removes all eases and tickers
     */
    destroy()
    {
        this.removeAll()
        if (this.options.useTicker)
        {
            this.ticker.remove(this.update, this)
        }
        else if (this.options.useRAF)
        {
            cancelAnimationFrame(this.handleRAF)
            this.handleRAF = null
        }
    }

    /**
     * add ease(s) to a PIXI.DisplayObject element
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
     * @param {number} [params.shake] shakes the object by this number (randomly placing the element +/-shake pixels away from starting point)
     * @param {number} [params.*] generic number parameter
     *
     * @param {object} [options]
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @param {number} [options.wait] wait this number of milliseconds before ease starts
     *
     * @returns {Easing}
     */
    add(element, params, options)
    {
        options = options || {}
        options.duration = typeof options.duration !== 'undefined' ? options.duration : this.options.duration
        options.ease = options.ease || this.options.ease
        if (typeof options.ease === 'string')
        {
            options.ease = Penner[options.ease]
        }
        const easing = new Easing(element, params, options)
        this.easings.push(easing)
        if (this.empty && this.options.useRAF)
        {
            this.handleRAF = requestAnimationFrame(() => this.update())
            this.lastTime = Date.now()
        }
        this.empty = false
        return easing
    }

    /**
     * create an ease that changes position (x, y) of the element by moving to the target at the speed
     * NOTE: under the hood this calls add(element, { x, y }, { duration: <calculated speed based on distance and speed> })
     * @param {PIXI.DisplayObject} element
     * @param {(PIXI.DisplayObject|PIXI.Point)} target
     * @param {number} speed in pixels / ms
     *
     * @param {object} [options]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @param {number} [options.wait] wait this number of milliseconds before ease starts
     * @param {boolean} [options.removeExisting] removes existing eases on the element of the same type (including x,y/position, skewX,skewY/skew, scaleX,scaleY/scale)
     *
     * @returns {Easing}
     */
    target(element, target, speed, options)
    {
        const duration = Math.sqrt(Math.pow(element.x - target.x, 2) + Math.pow(element.y - target.y, 2)) / speed
        options = options || {}
        options.duration = duration
        return this.add(element, { x: target.x, y: target.y }, options)
    }

    /**
     * helper function to add an ease that changes rotation to face the element at the desired target using the speed
     * NOTE: under the hood this calls add(element {x, y }, { duration: <calculated speed based on shortest rotation and speed> })
     * @param {PIXI.DisplayObject} element
     * @param {(PIXI.DisplayObject|PIXI.Point)} target
     * @param {number} speed in radians / ms
     *
     * @param {object} [options]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @param {number} [options.wait] wait this number of milliseconds before ease starts
     *
     * @returns {Easing}
     */
    face(element, target, speed, options)
    {
        const shortestAngle = Easing.shortestAngle(element.rotation, Math.atan2(target.y - element.y, target.x - element.x))
        const duration = Math.abs(shortestAngle - element.rotation) / speed
        options = options || {}
        options.duration = duration
        return this.add(element, { rotation: shortestAngle }, options)
    }

    /**
     * removes one or more eases from a DisplayObject
     * WARNING: 'complete' events will not fire for these removals
     * @param {PIXI.DisplayObject} element
     * @param {(string|string[])} [param] omit to remove all easings for an element
     */
    removeEase(element, param)
    {
        for (let i = 0; i < this.easings.length; i++)
        {
            if (this.easings[i].remove(element, param))
            {
                this.easings.splice(i, 1)
                i--
            }
        }
        if (this.easings.length === 0)
        {
            this.empty = true
            if (this.options.useRAF && this.handleRAF)
            {
                cancelAnimationFrame(this.handleRAF)
                this.handleRAF = null
            }
        }
    }

    /**
     * remove all easings
     * WARNING: 'complete' events will not fire for these removals
     */
    removeAll()
    {
        this.easings = []
        this.empty = true
        if (this.options.useRAF && this.handleRAF)
        {
            cancelAnimationFrame(this.handleRAF)
            this.handleRAF = null
        }
}

    /**
     * update frame; this is called automatically if options.useTicker !== false
     * @param {number} elapsed time in ms since last frame
     */
    update(elapsed)
    {
        if (this.options.useTicker)
        {
            elapsed = this.ticker.elapsedMS
        }
        else if (this.options.useRAF)
        {
            const now = Date.now()
            elapsed = now - this.lastTime
            this.lastTime = now
        }
        elapsed = Math.min(elapsed, this.options.maxFrame)
        if (!this.empty)
        {
            const list = this.easings.slice(0)
            for (let easing of list)
            {
                if (easing.update(elapsed))
                {
                    this.easings.splice(this.easings.indexOf(easing), 1)
                }
            }
            this.emit('each', this)
            if (this.easings.length === 0)
            {
                this.empty = true
                this.emit('complete', this)
            }
        }
        if (this.options.useRAF && this.easings.length)
        {
            this.handleRAF = requestAnimationFrame(() => this.update())
        }
        else
        {
            this.handleRAF = null
        }
    }

    /**
     * number of easings
     * @type {number}
     */
    get count()
    {
        return this.easings.length
    }

    /**
     * number of active easings across all elements
     * @returns {number}
     */
    countRunning()
    {
        let count = 0
        for (let entry of this.easings)
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