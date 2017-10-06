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

/** Helper list for multiple animations */
module.exports = class List extends Events
{
    /**
     * @param {object|object[]...} any animation class
     * @event List#done(List) final animation completed in the list
     * @event List#each(elapsed, List) each update
     */
    constructor()
    {
        super()
        this.list = []
        this.empty = true
        if (arguments.length)
        {
            this.add(...arguments)
        }
    }

    /**
     * Add animation(s) to animation list
     * @param {object|object[]...} any animation class
     */
    add()
    {
        for (let arg of arguments)
        {
            if (Array.isArray(arg))
            {
                for (let entry of arg)
                {
                    this.list.push(entry)
                }
            }
            else
            {
                this.list.push(arg)
            }
        }
        this.empty = false
        return arguments[0]
    }

    /**
     * get animation by index
     * @param {number} index
     * @return {object} animation class
     */
    get(index)
    {
        return this.list[index]
    }

    /**
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     */
    remove(animate)
    {
        if (animate)
        {
            if (Array.isArray(animate))
            {
                while (animate.length)
                {
                    const pop = animate.pop()
                    if (pop && pop.options)
                    {
                        pop.options.cancel = true
                    }
                }
            }
            else
            {
                if (animate && animate.options)
                {
                    animate.options.cancel = true
                }
            }
        }
        return animate
    }

    /**
     * remove all animations from list
     */
    removeAll()
    {
        this.list = []
        this.empty = true
    }

    /**
     * @param {number} elapsed time since last tick
     * @returns {number} of active animations
     */
    update(elapsed)
    {
        for (let i = this.list.length - 1; i >= 0; i--)
        {
            const animate = this.list[i]
            if (animate.update(elapsed))
            {
                this.emit('remove', animate)
                this.list.splice(i, 1)
            }
        }
        this.emit('each', elapsed, this)
        if (this.list.length === 0 && !this.empty)
        {
            this.emit('done', this)
            this.empty = true
        }
    }

    /**
     * @return {number} number of active animations
     */
    count()
    {
        let count = 0
        for (let animate of this.list)
        {
            if (!animate.options.pause)
            {
                count++
            }
        }
        return count
    }

    /**
     * handler for requestAnimationFrame
     * @private
     */
    loop()
    {
        if (this.running)
        {
            const now = performance.now()
            const elapsed = now - this.now > this.max ? this.max : now - this.now
            this.update(elapsed)
            this.now = now
            requestAnimationFrame(this.loop.bind(this))
        }
    }

    /**
     * starts an automatic requestAnimationFrame() loop
     * alternatively, you can call update() manually
     * @param {number} [max=1000 / 60] maximum FPS--i.e., in update(elapsed) if elapsed > max, then use max instead of elapsed
     */
    start(max)
    {
        this.max = max || 1000 / 60
        this.running = true
        this.now = performance.now()
        requestAnimationFrame(this.loop.bind(this))
    }

    /**
     * stops the automatic requestAnimationFrame() loop
     */
    stop()
    {
        this.running = false
    }

    /** helper to add to the list a new Ease.to class; see Ease.to class below for parameters */
    to() { return this.add(new To(...arguments)) }

    /** helper to add to the list a new Ease.angle class; see Ease.to class below for parameters */
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

/* global requestAnimationFrame, performance */