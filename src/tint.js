/**
 * @file tint.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */

const Color = require('yy-color');
const wait = require('./wait');

/** changes the tint of an object */
class tint extends wait
{
    /**
     * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} object
     * @param {number} tint
     * @param {number} [duration=0] in milliseconds, if 0, repeat forever
     * @param {object} [options] @see {@link Wait}
     */
    constructor(object, tint, duration, options)
    {
        options = options || {};
        super(object, options);
        this.type = 'Tint';
        if (Array.isArray(object))
        {
            this.list = object;
            this.object = this.list[0];
        }
        this.duration = duration;
        this.ease = this.options.ease || this.noEase;
        if (options.load)
        {
            this.load(options.load);
        }
        else
        {
            this.start = this.object.tint;
            this.to = tint;
        }
    }

    save()
    {
        if (this.options.cancel)
        {
            return null;
        }
        const save = super.save();
        save.start = this.start;
        save.to = this.to;
        return save;
    }

    load(load)
    {
        super.load(load);
        this.start = load.start;
        this.to = load.to;
    }

    calculate(/* elapsed */)
    {
        const percent = this.ease(this.time, 0, 1, this.duration);
        const color = Color.blend(percent, this.start, this.to);
        if (this.list)
        {
            for (let object of this.list)
            {
                object.tint = color;
            }
        }
        else
        {
            this.object.tint = color;
        }
    }

    reverse()
    {
        const swap = this.to;
        this.to = this.start;
        this.start = swap;
    }
}

module.exports = tint;