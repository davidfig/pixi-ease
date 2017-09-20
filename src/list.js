const EventEmitter = require('eventemitter3')

/** Helper list for multiple animations */
module.exports = class List extends EventEmitter
{
    /**
     * @param {object|object[]...} any animation class
     * @emits {done} final animation completed in the list
     * @emits {each} each update
     */
    constructor()
    {
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
     * @param {number} elapsed time since last tick
     * @returns {number} of active animations
     */
    update(elapsed)
    {
        let n = 0
        for (let i = this.list.length - 1; i >= 0; i--)
        {
            const animate = this.list[i]
            if (animate.update(elapsed))
            {
                this.emit('remove', animate)
                this.list.splice(i, 1)
            }
            else
            {
                if (!animate.options.pause)
                {
                    n++
                }
            }
        }
        this.emit('each', this, n)
        if (this.list.length === 0 && !this.empty)
        {
            this.emit('done', this)
            this.empty = true
        }
        return n
    }
}