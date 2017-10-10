const Loop = require('yy-loop')

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
module.exports = class List extends Loop
{
    /**
     * @param [options]
     * @param {number} [options.maxFrameTime=1000 / 60] maximum time in milliseconds for a frame
     * @param {object} [options.pauseOnBlur] pause loop when app loses focus, start it when app regains focus
     * @event List#done(List) final animation completed in the list
     * @event List#each(elapsed, List) each update
     */
    constructor(options)
    {
        options = options || {}
        super(options)
        this.empty = true
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
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     * @inherited from yy-loop
     */
    // remove(animate)

    /**
     * remove all animations from list
     * @inherited from yy-loop
     */
    // removeAll()

    /**
     * update frame; can be called manually or automatically with start()
     */
    update()
    {
        super.update()
        if (this.list.length === 0 && !this.empty)
        {
            this.emit('done', this)
            this.empty = true
        }
    }

    /**
     * @type {number} number of animations
     * @inherited yy-looop
     */
    // get count()

    /**
     * @type {number} number of active animations
     * @inherited yy-looop
     */
    // get countRunning()

    /**
     * starts an automatic requestAnimationFrame() loop based on yy-loop
     * alternatively, you can call update() manually
     * @inherited yy-loop
     */
    // start()

    /**
     * stops the automatic requestAnimationFrame() loop
     * @inherited yy-loop
     */
    // stop()

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

    /** Inherited functions from yy-loop */

    /**
     * adds an interval
     * @param {function} callback
     * @param {number} time
     * @param {number} count
     * @inherited from yy-loop
     */
    // interval(callback, time, count)

    /**
     * adds a timeout
     * @param {function} callback
     * @param {number} time
     * @inherited from yy-loop
     */
    // timeout(callback, time)
}