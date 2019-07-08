import Events from 'eventemitter3'

export class EaseDisplayObject extends Events
{
    /**
     * each DisplayObject has its own EaseElement object returned by add() or accessed through DisplayObject.__ease_{$id}
     * @extends EventEmitter
     * @fires EaseElement#complete
     * @fires EaseElement#each-*
     * @fires EaseElement#complete-*
     * @fires EaseElement#reverse-*
     * @fires EaseElement#repeat-*
     * @fires EaseElement#wait-*
     * @fires EaseElement#wait-end-*
     */
    constructor(element, ease)
    {
        super()

        /**
         * element being animated
         * @member {PIXI.DisplayObject}
         */
        this.element = element
        this.ease = ease
        this.eases = []
        this.connected = true
    }

    /**
     * clears all eases and disconnects object from list
     */
    clear()
    {
        this.eases = []
    }

    addParam(entry, param, options)
    {
        let start, to, delta, update, name = entry
        switch (entry)
        {
            case 'scaleX':
            case 'skewX':
                name = entry.substr(0, entry.length - 1)
                start = this.element[name].x
                to = param
                delta = param - start
                update = ease => this.updateCoord(ease, entry, name, 'x')
                break

            case 'scaleY':
            case 'skewY':
                name = entry.substr(0, entry.length - 1)
                start = this.element[name].y
                to = param
                delta = param - start
                update = ease => this.updateCoord(ease, entry, name, 'y')
                break

            case 'tint':
            case 'blend':
                const colors = Array.isArray(param) ? param : [this.element.tint, param]
                start = 0
                to = colors.length
                delta = to
                update = (entry === 'tint') ? ease => this.updateTint(ease, entry, colors) : ease => this.updateBlend(ease, entry, colors)
                break

            case 'shake':
                start = { x: this.element.x, y: this.element.y }
                to = param
                update = ease => this.updateShake(ease)
                break

            case 'position':
                start = { x: this.element.x, y: this.element.y }
                to = { x: param.x, y: param.y }
                delta = { x: to.x - start.x, y: to.y - start.y }
                update = ease => this.updatePosition(ease)
                break

            case 'skew':
            case 'scale':
                start = this.element[entry].x
                to = param
                delta = param - start
                update = ease => this.updatePoint(ease, entry)
                break

            case 'face':
                start = this.element.rotation
                to = EaseDisplayObject.shortestAngle(start, Math.atan2(param.y - this.element.y, param.x - this.element.x))
                delta = to - start
                update = ease => this.updateOne(ease, 'rotation')
                break

            default:
                start = this.element[entry]
                to = param
                delta = param - start
                update = ease => this.updateOne(ease, entry)
        }
        this.eases.push({ entry, options, update, start, to, delta, time: 0, wait: options.wait })
    }

    /**
     * helper function to find closest angle to change between angle start and angle finish (used by face)
     * @param {number} start angle
     * @param {number} finish angle
     */
    static shortestAngle(start, finish)
    {
        function mod(a, n)
        {
            return (a % n + n) % n
        }

        const PI_2 = Math.PI * 2
        let diff = Math.abs(start - finish) % PI_2
        diff = diff > Math.PI ? (PI_2 - diff) : diff

        const simple = finish - start
        const sign = mod((simple + Math.PI), PI_2) - Math.PI > 0 ? 1 : -1

        return diff * sign
    }

    /**
     * remove all matching parameters from element
     * @param {(string|string[])} params
     */
    remove(params)
    {
        params = typeof params === 'string' ? [params] : params
        for (let i = 0; i < this.eases.length; i++)
        {
            if (params.indexOf(this.eases[i].entry) !== -1)
            {
                this.eases.splice(i, 1)
                i--
            }
        }
    }

    add(params, options)
    {
        if (options.removeExisting)
        {
            const skew = ['skewX', 'skewY', 'skew']
            const scale = ['scaleX', 'scaleY', 'scale']
            const position = ['position', 'x', 'y']
            for (let entry in params)
            {
                if (skew.indexOf(entry) !== -1)
                {
                    this.remove(skew)
                }
                else if (scale.indexOf(entry) !== -1)
                {
                    this.remove(scale)
                }
                else if (entry === 'position')
                {
                    this.remove(position)
                }
                else if (entry === 'x')
                {
                    this.remove(['x', 'position'])
                }
                else if (entry === 'y')
                {
                    this.remove(['y', 'position'])
                }
                else
                {
                    this.remove(entry)
                }
            }
        }
        for (let entry in params)
        {
            const opts = { ease: options.ease, duration: options.duration, repeat: options.repeat, reverse: options.reverse, wait: options.wait }
            this.addParam(entry, params[entry], opts)
        }
    }

    updateOne(ease, entry)
    {
        this.element[entry] = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
    }

    updatePoint(ease, entry)
    {
        this.element[entry].x = this.element[entry].y = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
    }

    updatePosition(ease)
    {
        this.element.x = ease.options.ease(ease.time, ease.start.x, ease.delta.x, ease.options.duration)
        this.element.y = ease.options.ease(ease.time, ease.start.y, ease.delta.y, ease.options.duration)
    }

    updateCoord(ease, entry, name, coord)
    {
        this.element[name][coord] = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
    }

    updateTint(ease, entry, colors)
    {
        const index = Math.floor(ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration))
        this.element.tint = colors[index]
    }

    updateBlend(ease, entry, colors)
    {
        const calc = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
        const index = Math.floor(calc)
        let next = index + 1
        if (next === colors.length)
        {
            next = ease.options.reverse ? index - 1 : ease.options.repeat ? 0 : index
        }
        const percent = calc - index
        const color1 = colors[index]
        const color2 = colors[next]
        const r1 = color1 >> 16
        const g1 = color1 >> 8 & 0x0000ff
        const b1 = color1 & 0x0000ff
        const r2 = color2 >> 16
        const g2 = color2 >> 8 & 0x0000ff
        const b2 = color2 & 0x0000ff
        const percent1 = 1 - percent
        const r = percent1 * r1 + percent * r2
        const g = percent1 * g1 + percent * g2
        const b = percent1 * b1 + percent * b2
        this.element.tint = r << 16 | g << 8 | b
    }

    updateShake(ease)
    {
        function random(n)
        {
            return Math.floor(Math.random() * n) - Math.floor(n / 2)
        }
        this.element.x = ease.start.x + random(ease.to)
        this.element.y = ease.start.y + random(ease.to)
    }

    complete(ease)
    {
        if (ease.entry === 'shake')
        {
            this.element.x = ease.start.x
            this.element.y = ease.start.y
        }
    }

    reverse(ease)
    {
        if (ease.entry === 'position')
        {
            const swapX = ease.to.x
            const swapY = ease.to.y
            ease.to.x = ease.start.x
            ease.to.y = ease.start.y
            ease.start.x = swapX
            ease.start.y = swapY
            ease.delta.x = -ease.delta.x
            ease.delta.y = -ease.delta.y
        }
        else
        {
            const swap = ease.to
            ease.to = ease.start
            ease.start = swap
            ease.delta = -ease.delta
        }
    }

    repeat(ease)
    {
        switch (ease.entry)
        {
            case 'skewX':
                this.element.skew.x = ease.start
                break

            case 'skewY':
                this.element.skew.y = ease.start
                break

            case 'skew':
                this.element.skew.x = ease.start
                this.element.skew.y = ease.start
                break

            case 'scaleX':
                this.element.scale.x = ease.start
                break

            case 'scaleY':
                this.element.scale.y = ease.start
                break

            case 'scale':
                this.element.scale.x = ease.start
                this.element.scale.y = ease.start
                break

            case 'position':
                this.element.x = ease.start.x
                this.element.y = ease.start.y
                break

            default:
                this.element[ease.entry] = ease.start
        }
    }

    update(elapsed)
    {
        if (this.element._destroyed)
        {
            delete this.element[this.key]
            this.connected = false
            return true
        }
        if (this.eases.length)
        {
            for (let i = 0; i < this.eases.length; i++)
            {
                let current = elapsed
                const ease = this.eases[i]
                if (ease.wait)
                {
                    ease.wait -= elapsed
                    if (ease.wait <= 0)
                    {
                        current += ease.wait
                        ease.wait = 0
                        this.emit(`wait-end-${ease.entry}`, ease.element)
                    }
                    else
                    {
                        this.emit(`wait-${ease.entry}`, { element: this.element, wait: ease.wait })
                        continue
                    }
                }
                const duration = ease.options.duration
                let leftover = 0
                if (ease.time + current > duration)
                {
                    leftover = ease.time + current - duration
                    ease.time = duration
                }
                else
                {
                    ease.time += current
                }
                ease.update(ease)
                if (ease.time >= ease.options.duration)
                {
                    const options = ease.options
                    if (options.reverse)
                    {
                        this.reverse(ease)
                        ease.time = leftover
                        if (leftover)
                        {
                            ease.update(ease)
                        }
                        this.emit(`reverse-${ease.entry}`, ease.element)
                        if (!options.repeat)
                        {
                            options.reverse = false
                        }
                        else if (options.repeat !== true)
                        {
                            options.repeat--
                        }
                    }
                    else if (options.repeat)
                    {
                        this.repeat(ease)
                        ease.time = leftover
                        if (leftover)
                        {
                            ease.update(ease)
                        }
                        if (options.repeat !== true)
                        {
                            options.repeat--
                        }
                        this.emit(`repeat-${ease.entry}`, ease.element)
                    }
                    else
                    {
                        this.complete(ease)
                        this.eases.splice(i, 1)
                        i--
                        this.emit(`complete-${ease.entry}`, this.element)
                    }
                }
                this.emit(`each-${ease.entry}`, { element: this.element, time: ease.time })
            }
            this.emit('each', this)
            if (this.eases.length === 0)
            {
                this.emit('complete', this)
                if (this.eases.length === 0)
                {
                    this.connected = false
                    return true
                }
            }
        }
    }

    /**
     * number of parameters being eased
     * @returns {number}
     */
    get count()
    {
        return this.eases.length
    }
}

/**
 * fires when there are no more animations for this DisplayObject
 * @event EaseElement#complete
 * @type {EaseElement}
 */

/**
 * fires when the parameter completes the ease
 * where name is the name of the parameter being eased (e.g., complete-x)
 * @event EaseElement#complete-*
 * @type {EaseElement}
 */

/**
 * fires on each loop where there are animations
 * where * is the name of the parameter being eased (e.g., each-rotation)
 * @event EaseElement#each-*
 * @type {object}
 * @property {EaseElement} element
 * @property {number} time remaining
 */

/**
 * fires when an animation repeats
 * where * is the name of the parameter being eased (e.g., repeat-skewX)
 * @event EaseElement#repeat-*
 * @type {EaseElement}
 */

 /**
 * fires when an animation reverses
 * where * is the name of the parameter being eased (e.g., reverse-skewX)
 * @event EaseElement#reverse-*
 * @type {EaseElement}
 */

/**
 * fires on each frame while a wait is counting down
 * where * is the name fo the parameter being eased (e.g., wait-end-y)
 * @event EaseElement#wait-*
 * @type {object}
 * @property {EaseElement} element
 * @property {number} wait
 */

/**
 * fires after a wait expires for a parameter
 * where * is the name fo the parameter being eased (e.g., wait-end-y)
 * @event EaseElement#wait-end-*
 * @type { EaseElement }
 */