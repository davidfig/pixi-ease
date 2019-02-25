const PIXI = require('pixi.js')
const Events = require('eventemitter3')

const Angle = require('./angle')
const Face = require('./face')
const Load = require('./load')
const Movie = require('./movie')
const Shake = require('./shake')
const Target = require('./target')
const Tint = require('./tint')
const To = require('./to')
const Wait = require('./wait')

class Ease extends Events
{
    /**
     * Main class for creating eases
     * @param {object} [options]
     * @param {boolean} [options.noTicker] don't add the update function to PIXI.ticker
     * @param {PIXI.ticker} [options.ticker=PIXI.ticker.shared|PIXI.Ticker.shared] use this PIXI.ticker for the list
     * @extends eventemitter
     * @fire done
     * @fire each
     */
    constructor(options)
    {
        options = options || {}
        super()
        if (!options.noTicker)
        {
            const ticker = options.ticker || (PIXI.Ticker ? PIXI.Ticker.shared : PIXI.ticker.shared)
            ticker.add(() => this.update(ticker.deltaTime * 16.66))
        }
        this.list = []
        this.empty = true
        this.removeWaiting = []
        this.removeAllWaiting = false
    }

    /**
     * Add animation(s) to animation list
     * @param {(object|object[])} any animation class
     * @return {object} first animation
     */
    add()
    {
        let first
        for (let arg of arguments)
        {
            if (Array.isArray(arg))
            {
                for (let entry of arg)
                {
                    if (!first)
                    {
                        first = entry
                    }
                    this.list.push(entry)
                }
            }
            else
            {
                first = arg
                this.list.push(arg)
            }
        }
        this.empty = false
        return first
    }

    /**
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     */
    remove(animate)
    {
        if (this.inUpdate)
        {
            this.removeWaiting.push(animate)
        }
        else
        {
            if (Array.isArray(animate))
            {
                for (let each of animate)
                {
                    const index = this.list.indexOf(each)
                    if (index !== -1)
                    {
                        this.list.splice(index, 1)
                    }
                }
            }
            else
            {
                const index = this.list.indexOf(animate)
                if (index !== -1)
                {
                    this.list.splice(index, 1)
                }
            }
        }
    }

    /**
     * remove all animations from list
     * @inherited from yy-loop
     */
    removeAll()
    {
        if (this.inUpdate)
        {
            this.removeAllWaiting = true
        }
        else
        {
            this.list = []
        }
    }

    /**
     * update frame
     * this is automatically added to PIXI.ticker unless options.noTicker is set
     * if using options.noTicker, this should be called manually
     * @param {number} elasped time in MS since last update
     */
    update(elapsed)
    {
        this.inUpdate = true
        for (let i = 0, _i = this.list.length; i < _i; i++)
        {
            if (this.list[i] && this.list[i].update(elapsed))
            {
                this.list.splice(i, 1)
                i--
                _i--
            }
        }
        this.emit('each', this)
        if (this.list.length === 0 && !this.empty)
        {
            this.emit('done', this)
            this.empty = true
        }
        this.inUpdate = false
        if (this.removeAllWaiting)
        {
            this.removeAll()
            this.removeAllWaiting = false
        }
        while (this.removeWaiting.length)
        {
            this.remove(this.removeWaiting.pop())
        }
    }

    /**
     * number of animations
     * @type {number}
     */
    get count()
    {
        return this.list.length
    }

    /**
     * number of active animations
     * @type {number}
     */
    get countRunning()
    {
        let count = 0
        for (let entry of this.list)
        {
            if (!entry.pause)
            {
                count++
            }
        }
        return count
    }

    /**
     * default options for all eases
     * @typedef {object} EaseOptions
     * @param {object} [EaseOptions.options]
     * @param {number} [EaseOptions.options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [EaseOptions.options.pause] start the animation paused
     * @param {boolean|number} [EaseOptions.options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {boolean|number} [EaseOptions.options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {Function} [EaseOptions.options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {string|Function} [EaseOptions.options.ease] name or function from easing.js (see http://easings.net for examples)
     */

    /**
     * ease parameters of object
     * @param {PIXI.DisplayObject} object to animate
     * @param {object} goto - parameters to animate, e.g.: {alpha: 5, scale: {3, 5}, scale: 5, rotation: Math.PI}
     * @param {number} duration - time to run
     * @fires done
     * @fires wait
     * @fires first
     * @fires each
     * @fires loop
     * @fires reverse
     */
    to() { return this.add(new To(...arguments)) }

    /**
     * animate object's {x, y} using an angle
     * @param {object} object to animate
     * @param {number} angle in radians
     * @param {number} speed in pixels/millisecond
     * @param {number} [duration=0] in milliseconds; if 0, then continues forever
     * @param {object} [options] @see {@link Wait}
     */
    angle() { return this.add(new Angle(...arguments)) }

    /** helper to add to the list a new Ease.face class; see Ease.to class below for parameters */
    face() { return this.add(new Face(...arguments)) }

    /** helper to add to the list a new Ease.load class; see Ease.to class below for parameters */
    load() { return this.add(new Load(...arguments)) }

    /** helper to add to the list a new Ease.movie class; see Ease.to class below for parameters */
    movie() { return this.add(new Movie(...arguments)) }

    /** helper to add to the list a new Ease.shake class; see Ease.to class below for parameters */
    shake() { return this.add(new Shake(...arguments)) }

    /** helper to add to the list a new Ease.target class; see Ease.to class below for parameters */
    target() { return this.add(new Target(...arguments)) }

    /** helper to add to the list a new Ease.angle tint; see Ease.to class below for parameters */
    tint() { return this.add(new Tint(...arguments)) }

    /** helper to add to the list a new Ease.wait class; see Ease.to class below for parameters */
    wait() { return this.add(new Wait(...arguments)) }
}

module.exports = Ease