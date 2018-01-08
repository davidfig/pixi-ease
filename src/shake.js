const wait = require('./wait')

/**
 * shakes an object or list of objects
 */
class shake extends wait
{
    /**
     * @param {object|array} object or list of objects to shake
     * @param {number} amount to shake
     * @param {number} duration (in milliseconds) to shake
     * @param {object} options (see Animate.wait)
     */
    constructor(object, amount, duration, options)
    {
        options = options || {}
        super(object, options)
        this.type = 'Shake'
        if (Array.isArray(object))
        {
            this.array = true
            this.list = object
        }
        if (options.load)
        {
            this.load(options.load)
        }
        else
        {
            if (this.list)
            {
                this.start = []
                for (let i = 0; i < object.length; i++)
                {
                    const target = object[i]
                    this.start[i] = {x: target.x, y: target.y}
                }
            }
            else
            {
                this.start = {x: object.x, y: object.y}
            }
            this.amount = amount
            this.duration = duration
        }
    }

    save()
    {
        const save = super.save()
        save.start = this.start
        save.amount = this.amount
        return save
    }

    load(load)
    {
        super.load(load)
        this.start = load.start
        this.amount = load.amount
    }

    calculate(/*elapsed*/)
    {
        const object = this.object
        const start = this.start
        const amount = this.amount
        if (this.array)
        {
            const list = this.list
            for (let i = 0; i < list.length; i++)
            {
                const object = list[i]
                const actual = start[i]
                object.x = actual.x + Math.floor(Math.random() * amount * 2) - amount
                object.y = actual.y + Math.floor(Math.random() * amount * 2) - amount
            }
        }
        object.x = start.x + Math.floor(Math.random() * amount * 2) - amount
        object.y = start.y + Math.floor(Math.random() * amount * 2) - amount
    }

    done()
    {
        const object = this.object
        const start = this.start
        if (this.array)
        {
            const list = this.list
            for (let i = 0; i < list.length; i++)
            {
                const object = list[i]
                const actual = start[i]
                object.x = actual.x
                object.y = actual.y
            }
        }
        else
        {
            object.x = start.x
            object.y = start.y
        }
    }
}

module.exports = shake