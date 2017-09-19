const wait = require('./wait')

/**
 * animate a movie of textures
 */
module.exports = class movie extends wait
{
    /**
     * @param {object} object to animate
     * @param {PIXI.Texture[]} textures
     * @param {number} [duration=0] time to run (use 0 for infinite duration--should only be used with customized easing functions)
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values n: continue animation n times
     * @param {Function} [options.load] loads an animation using a .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function} [options.ease] function from easing.js (see http://easings.net for examples)
     * @emits {done} animation expires
     * @emits {cancel} animation is cancelled
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, textures, duration, options)
    {
        options = options || {}
        super(object, options)
        this.type = 'Movie'
        if (Array.isArray(object))
        {
            this.list = object
            this.object = this.list[0]
        }
        this.ease = options.ease || this.noEase
        if (options.load)
        {
            this.load(options.load)
        }
        else
        {
            this.textures = textures
            this.duration = duration
            this.current = 0
            this.length = textures.length
            this.interval = duration / this.length
            this.isReverse = false
            this.restart()
        }
    }

    save()
    {
        if (this.options.cancel)
        {
            return null
        }
        const save = super.save()
        save.goto = this.goto
        save.current = this.current
        save.length = this.length
        save.interval = this.interval
        return save
    }

    load(load)
    {
        super.load(load)
        this.goto = load.goto
        this.current = load.current
        this.interval = load.current
    }

    restart()
    {
        this.current = 0
        this.time = 0
        this.isReverse = false
    }

    reverse()
    {
        this.isReverse = !this.isReverse
    }

    calculate()
    {
        let index = Math.round(this.ease(this.time, 0, this.length - 1, this.duration))
        if (this.isReverse)
        {
            index = this.length - 1 - index
        }
        if (this.list)
        {
            for (let i = 0; i < this.list.length; i++)
            {
                this.list[i].texture = this.textures[index]
            }
        }
        else
        {
            this.object.texture = this.textures[index]
        }
    }
}