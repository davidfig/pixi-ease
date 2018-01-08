const Color = require('yy-color')
const wait = require('./wait')

class tint extends wait
{
    /**
     * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} object
     * @param {number|number[]} tint
     * @param {number} [duration] in milliseconds
     * @param {object} [options] @see {@link Wait}
     */
    constructor(object, tint, duration, options)
    {
        options = options || {}
        super(object, options)
        this.type = 'Tint'
        if (Array.isArray(object))
        {
            this.list = object
            this.object = this.list[0]
        }
        this.duration = duration
        if (options.load)
        {
            this.load(options.load)
        }
        else if (Array.isArray(tint))
        {
            this.tints = [this.object.tint, ...tint]
        }
        else
        {
            this.start = this.object.tint
            this.to = tint
        }
    }

    save()
    {
        const save = super.save()
        save.start = this.start
        save.to = this.to
        return save
    }

    load(load)
    {
        super.load(load)
        this.start = load.start
        this.to = load.to
    }

    calculate()
    {
        const percent = this.options.ease(this.time, 0, 1, this.duration)
        if (this.tints)
        {
            const each = 1 / (this.tints.length - 1)
            let per = each
            for (let i = 1; i < this.tints.length; i++)
            {
                if (percent <= per)
                {
                    const color = Color.blend(1 - (per - percent) / each, this.tints[i - 1], this.tints[i])
                    if (this.list)
                    {
                        for (let object of this.list)
                        {
                            object.tint = color
                        }
                    }
                    else
                    {
                        this.object.tint = color
                    }
                    break;
                }
                per += each
            }
        }
        else
        {
            const color = Color.blend(percent, this.start, this.to)
            if (this.list)
            {
                for (let object of this.list)
                {
                    object.tint = color
                }
            }
            else
            {
                this.object.tint = color
            }
        }
    }

    reverse()
    {
        if (this.tints)
        {
            const tints = []
            for (let i = this.tints.length - 1; i >= 0; i--)
            {
                tints.push(this.tints[i])
            }
            this.tints = tints
        }
        else
        {
            const swap = this.to
            this.to = this.start
            this.start = swap
        }
    }
}

module.exports = tint