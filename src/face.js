const Angle = require('yy-angle')
const wait = require('./wait')

/** Rotates an object to face the target */
module.exports = class face extends wait
{
    /**
     * @param {object} object
     * @param {Point} target
     * @param {number} speed in radians/millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't stop animation when complete
     */
    constructor(object, target, speed, options)
    {
        options = options || {}
        super(object, options)
        this.type = 'Face'
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
        if (this.options.cancel)
        {
            return null
        }
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
        var angle = Angle.angleTwoPoints(this.object.position, this.target)
        var difference = Angle.differenceAngles(angle, this.object.rotation)
        if (difference === 0)
        {
            this.emit('done', this.object)
            if (!this.options.keepAlive)
            {
                return true
            }
        }
        else
        {
            var sign = Angle.differenceAnglesSign(angle, this.object.rotation)
            var change = this.speed * elapsed
            var delta = (change > difference) ? difference : change
            this.object.rotation += delta * sign
        }
    }
}