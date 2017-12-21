const wait = require('./wait')

/** move an object to a target's location */
module.exports = class target extends wait
{
    /**
     * move to a target
     * @param {object} object - object to animate
     * @param {object} target - object needs to contain {x: x, y: y}
     * @param {number} speed - number of pixels to move per millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't cancel the animation when target is reached
     */
    constructor(object, target, speed, options)
    {
        options = options || {}
        super(object, options)
        this.type = 'Target'
        this.target = target
        if (options.load)
        {
            this.load(options.load)
        }
        else
        {
            this.speed = speed
        }
    }

    save()
    {
        const save = super.save()
        save.speed = this.speed
        save.keepAlive = this.options.keepAlive
        return save
    }

    load(load)
    {
        super.load(load)
        this.speed = load.speed
        this.options.keepAlive = load.keepAlive
    }

    calculate(elapsed)
    {
        const deltaX = this.target.x - this.object.x
        const deltaY = this.target.y - this.object.y
        if (deltaX === 0 && deltaY === 0)
        {
            this.emit('done', this.object)
            if (!this.options.keepAlive)
            {
                return true
            }
        }
        else
        {
            const angle = Math.atan2(deltaY, deltaX)
            this.object.x += Math.cos(angle) * elapsed * this.speed
            this.object.y += Math.sin(angle) * elapsed * this.speed
            if ((deltaX >= 0) !== ((this.target.x - this.object.x) >= 0))
            {
                this.object.x = this.target.x
            }
            if ((deltaY >= 0) !== ((this.target.y - this.object.y) >= 0))
            {
                this.object.y = this.target.y
            }
        }
    }
}