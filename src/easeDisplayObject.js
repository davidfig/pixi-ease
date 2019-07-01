import Events from 'eventemitter3'

export class EaseDisplayObject extends Events
{
    /**
     * each DisplayObject has its own EaseElement object returned by add() or accessed through DisplayObject.__ease_{$id}
     * @extends EventEmitter
     * @fires EaseElement#complete
     * @fires EaseElement#each-*
     * @fires EaseElement#complete-*
     * @fires EaseElement#loop-*
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

    addParam(entry, param, options)
    {
        let start, to, delta, update, name
        switch (entry)
        {
            case 'scaleX':
            case 'skewX':
                name = entry.substr(0, entry.length - 1)
                start = this.element[name].x
                to = param
                delta = param - start
                update = (ease) => this.updateCoord(ease, entry, name, 'x')
                break

            case 'scaleY':
            case 'skewY':
                name = entry.substr(0, entry.length - 1)
                start = this.element[name].y
                to = param
                delta = param - start
                update = (ease) => this.updateCoord(ease, entry, name, 'y')
                break

            case 'tint':
            case 'tintBlend':
                start = 0
                to = 1
                delta = 1
                const colors = !Array.isArray(param) ? [param] : param
                const tint = this.element.tint
                colors.unshift(tint ? tint : 0xffffff)
                const interval = 1 / colors.length
                update = (entry === 'tint') ? (ease) => this.updateTint(ease, entry, colors, interval) : (ease) => this.updateBlend(ease, entry, colors, interval)
                break

            case 'shake':
                start = { x: this.element.x, y: this.element.y }
                to = param
                update = (ease) => this.updateShake(ease)
                break

            default:
                start = this.element[entry]
                to = param
                delta = param - start
                update = (ease) => this.updateOne(ease, entry)
        }

        const eases = this.eases
        let i
        for (i = 0; i < eases.length; i++)
        {
            if (eases[i].entry === entry)
            {
                break
            }
        }
        const add = { entry, options, update, start, to, delta, time: 0, wait: options.wait || 0 }
        if (i !== eases.length)
        {
            this.eases[i] = add
        }
        this.eases.push(add)
    }

    add(params, options)
    {
        for (let entry in params)
        {
            const opts = { ease: options.ease, duration: options.duration, repeat: options.repeat, reverse: options.reverse }
            const param = params[entry]
            if (entry === 'scale')
            {
                this.addParam('scaleX', param, opts)
                this.addParam('scaleY', param, opts)
            }
            else if (entry === 'skew')
            {
                this.addParam('skewX', param, opts)
                this.addParam('skewY', param, opts)
            }
            else if (entry === 'target')
            {
                this.addParam('x', param.x, opts)
                this.addParam('y', param.y, opts)
            }
            else
            {
                this.addParam(entry, param, opts)
            }
        }
    }

    updateOne(ease, entry)
    {
        this.element[entry] = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
    }

    updateCoord(ease, entry, name, coord)
    {
        this.element[name][coord] = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
    }

    updateTint(ease, entry, colors, interval)
    {
        const percent = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
        const index = Math.floor(percent / interval)
        this.element.tint = colors[index]
    }

    updateBlend(ease, entry, colors, interval)
    {
        const percent = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration)
        let index = Math.floor(percent / interval)
        index = index === colors.length ? index - 1 : index
        let next = index + 1
        if (next === colors.length)
        {
            next = ease.options.reverse ? index - 1 : 0
        }
        const percentBlend = (percent % interval) / interval
        const color1 = colors[index]
        const color2 = colors[next]
        if (percentBlend === 0)
        {
            return color1
        }
        if (percentBlend === 1)
        {
            return color2
        }
        var r1 = color1 >> 16
        var g1 = color1 >> 8 & 0x0000ff
        var b1 = color1 & 0x0000ff
        var r2 = color2 >> 16
        var g2 = color2 >> 8 & 0x0000ff
        var b2 = color2 & 0x0000ff
        var percent1 = 1 - percentBlend
        var r = percent1 * r1 + percent * r2
        var g = percent1 * g1 + percent * g2
        var b = percent1 * b1 + percent * b2
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

    reverse(ease)
    {
        const swap = ease.to
        ease.to = ease.start
        ease.start = swap
        ease.delta = -ease.delta
    }

    update(elapsed)
    {
        if (this.element._destroyed)
        {
            delete this.element[this.key]
            return true
        }
        const eases = this.eases
        for (let i = 0, _i = eases.length; i < _i; i++)
        {
            const ease = eases[i]
            if (ease.wait !== 0)
            {
                ease.wait -= elapsed
                if (ease.wait <= 0)
                {
                    ease.wait = 0
                    this.emit('wait-end-' + ease.name, ease.element)
                }
                else
                {
                    this.emit('wait-' + ease.entry, { element: this.element, wait: ease.wait })
                    continue
                }
            }
            const duration = ease.options.duration
            let leftover = 0
            if (ease.time + elapsed > duration)
            {
                leftover = ease.time + elapsed - duration
                ease.time = duration
            }
            else
            {
                ease.time += elapsed
            }
            ease.update(ease)
            if (ease.time >= ease.options.duration)
            {
                const options = ease.options
                if (options.reverse)
                {
                    this.emit('loop-' + ease.name, ease.element)
                    this.reverse(ease)
                    ease.time = leftover
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
                    ease.time = leftover
                    if (options.repeat !== true)
                    {
                        options.repeat--
                    }
                }
                else
                {
                    this.emit('complete-' + ease.entry, this.element)
                    eases.splice(i, 1)
                    i--
                    _i--
                }
            }
            this.emit('each-' + ease.entry, this.element)
        }
        this.emit('each', this)
        if (Object.keys(eases).length === 0)
        {
            this.emit('complete', this)
            this.connected = false
            return true
        }
    }

    /**
     * number of parameters being eased
     * @returns {number}
     */
    get count()
    {
        return Object.keys(this.eases)
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
 * @type {EaseElement}
 */

/**
 * fires when an animation repeats or reverses
 * where * is the name of the parameter being eased (e.g., complete-skewX)
 * @event EaseElement#loop-*
 * @type {EaseElement}
 */

/**
 * fires on each loop while a wait is counting down
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