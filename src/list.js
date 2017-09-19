module.exports = class List
{
    constructor()
    {
        this.list = []
        if (arguments.list)
        {
            this.add(arguments)
        }
    }

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
        return arguments[0]
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
        return n
    }
}