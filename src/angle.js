const wait = require('./wait')

class angle extends wait
{
    /**
     * animate object's {x, y} using an angle
     * @param {object} object to animate
     * @param {number} angle in radians
     * @param {number} speed in pixels/millisecond
     * @param {number} [duration=0] in milliseconds; if 0, then continues forever
     * @param {object} [options] @see {@link Wait}
     * @private
     */
    constructor(object, angle, speed, duration, options)
    {
        options = options || {}
        super(object, options)
        this.type = 'Angle'
        if (options.load)
        {
            this.load(options.load)
        }
        else
        {
            this.angle = angle
            this.speed = speed
            this.duration = duration || 0
        }
    }

    save()
    {
        const save = super.save()
        save.angle = this.angle
        save.speed = this.speed
        return save
    }

    load(load)
    {
        super.load(load)
        this.angle = load.angle
        this.speed = load.speed
    }

    get angle()
    {
        return this._angle
    }
    set angle(value)
    {
        this._angle = value
        this.sin = Math.sin(this._angle)
        this.cos = Math.cos(this._angle)
    }

    calculate(elapsed)
    {
        this.object.x += this.cos * elapsed * this.speed
        this.object.y += this.sin * elapsed * this.speed
    }

    reverse()
    {
        this.angle += Math.PI
    }
}

module.exports = angle