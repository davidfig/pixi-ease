const PIXI = require('pixi.js')
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

module.exports = class List extends Events
{
    /**
     * Helper list for multiple animations
     * @param {object} [options]
     * @param {boolean} [options.noTicker] don't add the update function to PIXI.ticker
     * @param {PIXI.ticker} [options.ticker=PIXI.ticker.shared] use this PIXI.ticker for the list
     *
     * @event List#done(List) final animation completed in the list
     * @event List#each(elapsed, List) each update after eases are updated
     */
    constructor(options)
    {
        options = options || {}
        super()
        if (!options.noTicker)
        {
            const ticker = options.ticker || PIXI.ticker.shared
            ticker.add(() => this.update(ticker.elapsedMS))
        }
        this.list = []
        this.empty = true
    }

    /**
     * Add animation(s) to animation list
     * @param {object|object[]...} any animation class
     * @return {object} first animation
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
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     * @inherited from yy-loop
     */
    remove(animate)
    {
        this.list.splice(this.list.indexOf(animate), 1)
    }

    /**
     * remove all animations from list
     * @inherited from yy-loop
     */
    removeAll()
    {
        this.list = []
    }

    /**
     * update frame
     * this is automatically added to PIXI.ticker unless options.noTicker is set
     * if using options.noTicker, this should be called manually
     * @param {number} elasped time in MS since last update
     */
    update(elapsed)
    {
        for (let i = 0, _i = this.list.length; i < _i; i++)
        {
            if (this.list[i].update(elapsed))
            {
                this.list.splice(i, 1)
                i--
                _i--
            }
        }
        this.emit('each', this)
        if (this.list.length === 0 && !this.empty)
        {
            this.emit('done', this)
            this.empty = true
        }
    }

    /**
     * number of animations
     * @type {number}
     */
    get count()
    {
        return this.list.length
    }

    /**
     * number of active animations
     * @type {number}
     */
    get countRunning()
    {
        let count = 0
        for (let entry of this.list)
        {
            if (!entry.pause)
            {
                count++
            }
        }
        return count
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