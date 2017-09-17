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
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values n: continue animation n times
     * @param {number} [options.id] user-generated id (e.g., I use it to properly load animations when an object has multiple animations running)
     * @param {boolean} [options.orphan] delete animation if .parent of object (or first object in list) is null
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function|string} [options.ease] function (or penner function name) from easing.js (see http://easings.net for examples)*
     * @param {boolean} [options.noAdd] don't manage the animation through the main Ease loop (updates must be called manually)
     * @emits {done} animation expires
     * @emits {cancel} animation is cancelled
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, options)
    {
        super()
        const Animate = require('./animate')
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
        if (!this.options.ease && Animate.defaults.ease)
        {
            this.options.ease = Animate.defaults.ease
        }
        if (this.options.ease && typeof this.options.ease !== 'function')
        {
            this.options.ease = Easing[options.ease] || Animate.defaults.easing
        }
        if (!this.options.noAdd)
        {
            Animate.add(this)
        }
    }

    save()
    {
        if (this.options.cancel)
        {
            return null
        }
        const save = {type: this.type, time: this.time, duration: this.duration}
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
        if (options.continue)
        {
            save.continue = options.continue
        }
        if (options.cancel)
        {
            save.cancel = options.cancel
        }
        return save
    }

    load(load)
    {
        this.options.wait = load.wait
        this.options.pause = load.pause
        this.options.repeat = load.repeat
        this.options.reverse = load.reverse
        this.options.continue = load.continue
        this.options.cancel = load.cancel
        this.options.id = load.id
        this.time = load.time
        this.duration = load.duration
    }

    pause()
    {
        this.options.pause = true
    }

    resume()
    {
        this.options.pause = false
    }

    cancel()
    {
        this.options.cancel = true
    }

    done()
    {
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
        else if (this.options.continue)
        {
            this.continue()
            this.time = leftOver
            if (this.options.continue !== true)
            {
                this.options.continue--
            }
            this.emit('loop', this.list || this.object)
        }
        else
        {
            this.done()
            this.emit('done', this.list || this.object, leftOver)
            this.list = this.object = null
            return true
        }
    }

    update(elapsed)
    {
        if (!this.options)
        {
            return
        }
        if (this.options.cancel)
        {
            this.emit('cancel', this.list || this.object)
            return true
        }
        if (this.options.orphan)
        {
            if (this.list)
            {
                if (!this.list[0].parent)
                {
                    return true
                }
            }
            else if (!this.object.parent)
            {
                return true
            }
        }
        if (this.options.restart)
        {
            this.restart()
            this.options.pause = false
        }
        if (this.options.original)
        {
            this.time = 0
            this.options.pause = false
        }
        if (this.options.pause)
        {
            return
        }
        if (this.options.wait)
        {
            this.options.wait -= elapsed
            if (this.options.wait <= 0)
            {
                elapsed = -this.options.wait
                this.options.wait = false
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
        if (this.duration !== 0 && this.time > this.duration)
        {
            leftOver = this.time - this.duration
            this.time = this.duration
        }
        const allDone = this.calculate(elapsed)
        this.emit('each', elapsed, this.list || this.object, this)
        if (this.type === 'Wait' || (this.duration !== 0 && this.time === this.duration))
        {
            return this.end(leftOver)
        }
        if (allDone)
        {
            return true
        }
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

    calculate() {}
}