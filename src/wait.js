const Easing = require('penner')
const EventEmitter = require('eventemitter3')

module.exports = class wait extends EventEmitter
{
    /**
     * @param {object|object[]} object or list of objects to animate
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     *
     * @param {number} [options.id] user-generated id (e.g., I use it to properly load animations when an object has multiple animations running)
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function|string} [options.ease] function (or penner function name) from easing.js (see http://easings.net for examples)*
     *
     * @emits {done} animation expires
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, options)
    {
        super()
        this.object = object
        this.options = options || {}
        this.type = 'Wait'
        if (this.options.load)
        {
            this.load(this.options.load)
        }
        else
        {
            this.time = 0
        }
        if (this.options.ease && typeof this.options.ease !== 'function')
        {
            this.options.easeName = this.options.ease
            this.options.ease = Easing[this.options.ease]
        }
        if (!this.options.ease)
        {
            this.options.ease = Easing['linear']
        }
    }

    save()
    {
        const save = { type: this.type, time: this.time, duration: this.duration, ease: this.options.easeName }
        const options = this.options
        if (options.wait)
        {
            save.wait = options.wait
        }
        if (typeof options.id !== 'undefined')
        {
            save.id = options.id
        }
        if (options.pause)
        {
            save.pause = options.pause
        }
        if (options.repeat)
        {
            save.repeat = options.repeat
        }
        if (options.reverse)
        {
            save.reverse = options.reverse
        }
        return save
    }

    load(load)
    {
        this.options.wait = load.wait
        this.options.pause = load.pause
        this.options.repeat = load.repeat
        this.options.reverse = load.reverse
        this.options.id = load.id
        this.options.ease = load.ease
        if (this.options.ease && typeof this.options.ease !== 'function')
        {
            this.options.easeName = this.options.ease
            this.options.ease = Easing[this.options.ease]
        }
        if (!this.options.ease)
        {
            this.options.ease = Easing['linear']
        }
        this.time = load.time
        this.duration = load.duration
    }

    /**
     * @type {boolean} pause this entry
     */
    set pause(value)
    {
        this.options.pause = value
    }
    get pause()
    {
        return this.options.pause
    }

    end(leftOver)
    {
        if (this.options.reverse)
        {
            this.reverse()
            this.time = leftOver
            if (!this.options.repeat)
            {
                if (this.options.reverse === true)
                {
                    this.options.reverse = false
                }
                else
                {
                    this.options.reverse--
                }
            }
            else
            {
                if (this.options.repeat !== true)
                {
                    this.options.repeat--
                }
            }
            this.emit('loop', this.list || this.object)
        }
        else if (this.options.repeat)
        {
            this.time = leftOver
            if (this.options.repeat !== true)
            {
                this.options.repeat--
            }
            this.emit('loop', this.list || this.object)
        }
        else
        {
            this.done()
            this.emit('done', this.list || this.object, leftOver)
            // this.list = this.object = null
            return true
        }
    }

    update(elapsed)
    {
        const options = this.options
        if (options.pause)
        {
            return
        }
        if (options.wait)
        {
            options.wait -= elapsed
            if (options.wait <= 0)
            {
                elapsed = -options.wait
                options.wait = false
            }
            else
            {
                this.emit('wait', elapsed, this.list || this.object)
                return
            }
        }
        if (!this.first)
        {
            this.first = true
            this.emit('first', this.list || this.object)
        }
        this.time += elapsed
        let leftOver = 0
        const duration = this.duration
        let time = this.time
        if (duration !== 0 && time > duration)
        {
            leftOver = time - duration
            this.time = time = duration
        }
        this.calculate(elapsed)
        this.emit('each', elapsed, this.list || this.object, this)
        if (this.type === 'Wait' || (duration !== 0 && time === duration))
        {
            return this.end(leftOver)
        }
        return time === duration
    }

    // correct certain DOM values
    _correctDOM(key, value)
    {
        switch (key)
        {
            case 'opacity':
                return (isNaN(value)) ? 1 : value
        }
        return value
    }

    reverse() {}
    calculate() { }
    done() { }
}