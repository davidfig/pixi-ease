import Events from 'eventemitter3'

/**
 * Controls a group of easings added by Ease.add()
 * @extends EventEmitter
 */
export class Easing extends Events
{
    /**
     * an easing that acts on an element or an array of elements
     * @param {(PIXI.DisplayObject|PIXI.DisplayObject[])} element
     * @param {object} params
     * @param {object} options
     * @extends EventEmitter
     * @fires EaseElement#complete
     * @fires EaseElement#each
     * @fires EaseElement#complete
     * @fires EaseElement#reverse
     * @fires EaseElement#repeat
     * @fires EaseElement#wait
     * @fires EaseElement#wait-end
     */
    constructor(element, params, options)
    {
        super()

        /**
         * element(s) being eased
         * @member {(PIXI.DisplayObject|PIXI.DisplayObject[])}
         */
        this.elements = Array.isArray(element) ? element : [element]
        this.eases = []
        this.options = options || {}
        this.time = 0
        for (let param in params)
        {
            for (let element of this.elements)
            {
                this.addParam(element, param, params[param])
            }
        }
    }

    addParam(element, entry, param)
    {
        let start, to, delta, update, name = entry
        switch (entry)
        {
            case 'scaleX':
            case 'skewX':
                name = entry.substr(0, entry.length - 1)
                start = element[name].x
                to = param
                delta = param - start
                update = ease => this.updateCoord(ease, name, 'x')
                break

            case 'scaleY':
            case 'skewY':
                name = entry.substr(0, entry.length - 1)
                start = element[name].y
                to = param
                delta = param - start
                update = ease => this.updateCoord(ease, name, 'y')
                break

            case 'tint':
            case 'blend':
                const colors = Array.isArray(param) ? param : [element.tint, param]
                start = 0
                to = colors.length
                delta = to
                update = (entry === 'tint') ? ease => this.updateTint(ease, colors) : ease => this.updateBlend(ease, colors)
                break

            case 'shake':
                start = { x: element.x, y: element.y }
                to = param
                update = ease => this.updateShake(ease)
                break

            case 'position':
                start = { x: element.x, y: element.y }
                to = { x: param.x, y: param.y }
                delta = { x: to.x - start.x, y: to.y - start.y }
                update = ease => this.updatePosition(ease)
                break

            case 'skew':
            case 'scale':
                start = element[entry].x
                to = param
                delta = param - start
                update = ease => this.updatePoint(ease, entry)
                break

            case 'face':
                start = element.rotation
                to = Easing.shortestAngle(start, Math.atan2(param.y - element.y, param.x - element.x))
                delta = to - start
                update = ease => this.updateOne(ease, 'rotation')
                break

            default:
                start = element[entry]
                to = param
                delta = param - start
                update = ease => this.updateOne(ease, entry)
        }
        this.eases.push({ element, entry, update, start, to, delta })
    }

    /**
     * helper function to find closest angle to change between angle start and angle finish (used by face)
     * @param {number} start angle
     * @param {number} finish angle
     * @private
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
     * remove all easings with matching element and params
     * @param {PIXI.DisplayObject} [element] if not set, removes all elements in this easing
     * @param {(string|string[])} [params] if not set, removes all params for each element
     */
    remove(element, params)
    {
        if (arguments.length === 0)
        {
            this.eases = []
        }
        else
        {
            if (typeof params === 'string')
            {
                params = [params]
            }
            for (let i = 0; i < this.eases.length; i++)
            {
                const ease = this.eases[i]
                if ((!element || ease.element === element) && (!params || params.indexOf(ease.entry) !== -1))
                {
                    this.eases.splice(i, 1)
                    i--
                }
            }
        }
        if (this.eases.length === 0)
        {
            return true
        }
    }

    updateOne(ease, entry)
    {
        ease.element[entry] = this.options.ease(this.time, ease.start, ease.delta, this.options.duration)
    }

    updatePoint(ease, entry)
    {
        ease.element[entry].x = ease.element[entry].y = this.options.ease(this.time, ease.start, ease.delta, this.options.duration)
    }

    updatePosition(ease)
    {
        ease.element.x = this.options.ease(this.time, ease.start.x, ease.delta.x, this.options.duration)
        ease.element.y = this.options.ease(this.time, ease.start.y, ease.delta.y, this.options.duration)
    }

    updateCoord(ease, name, coord)
    {
        ease.element[name][coord] = this.options.ease(this.time, ease.start, ease.delta, this.options.duration)
    }

    updateTint(ease, colors)
    {
        let index = Math.floor(this.options.ease(this.time, ease.start, ease.delta, this.options.duration))
        if (index === colors.length)
        {
            index = colors.length - 1
        }
        ease.element.tint = colors[index]
    }

    updateBlend(ease, colors)
    {
        const calc = this.options.ease(this.time, ease.start, ease.delta, this.options.duration)
        let index = Math.floor(calc)
        if (index === colors.length)
        {
            index = colors.length - 1
        }
        let next = index + 1
        if (next === colors.length)
        {
            next = this.options.reverse ? index - 1 : this.options.repeat ? 0 : index
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
        ease.element.tint = r << 16 | g << 8 | b
    }

    updateShake(ease)
    {
        function random(n)
        {
            return Math.floor(Math.random() * n) - Math.floor(n / 2)
        }
        ease.element.x = ease.start.x + random(ease.to)
        ease.element.y = ease.start.y + random(ease.to)
    }

    complete(ease)
    {
        if (ease.entry === 'shake')
        {
            ease.element.x = ease.start.x
            ease.element.y = ease.start.y
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
                ease.element.skew.x = ease.start
                break

            case 'skewY':
                ease.element.skew.y = ease.start
                break

            case 'skew':
                ease.element.skew.x = ease.start
                ease.element.skew.y = ease.start
                break

            case 'scaleX':
                ease.element.scale.x = ease.start
                break

            case 'scaleY':
                ease.element.scale.y = ease.start
                break

            case 'scale':
                ease.element.scale.x = ease.start
                ease.element.scale.y = ease.start
                break

            case 'position':
                ease.element.x = ease.start.x
                ease.element.y = ease.start.y
                break

            default:
                ease.element[ease.entry] = ease.start
        }
    }

    update(elapsed)
    {
        if (this.eases.length === 0)
        {
            return true
        }
        if (this.options.wait)
        {
            this.options.wait -= elapsed
            if (this.options.wait > 0)
            {
                this.emit('wait', this)
                return
            }
            else
            {
                elapsed = -this.options.wait
                this.options.wait = 0
                this.emit('wait-end', this)
            }
        }
        this.time += elapsed
        let leftover = 0
        if (this.time >= this.options.duration)
        {
            leftover = this.time - this.options.duration
            this.time = this.options.duration
        }
        for (let i = 0; i < this.eases.length; i++)
        {
            const ease = this.eases[i]
            if (ease.element._destroyed)
            {
                this.eases.splice(i, 1)
                i--
            }
            else
            {
                ease.update(ease)
            }
        }
        this.emit('each', this)
        if (this.time >= this.options.duration)
        {
            if (this.options.reverse)
            {
                this.eases.forEach(ease => this.reverse(ease))
                this.time = leftover
                if (leftover)
                {
                    this.eases.forEach(ease => ease.update(ease))
                }
                this.emit('reverse', this)
                if (!this.options.repeat)
                {
                    this.options.reverse = false
                }
                else if (this.options.repeat !== true)
                {
                    this.options.repeat--
                }
            }
            else if (this.options.repeat)
            {
                this.eases.forEach(ease => this.repeat(ease))
                this.time = leftover
                if (leftover)
                {
                    this.eases.forEach(ease => ease.update(ease))
                }
                if (this.options.repeat !== true)
                {
                    this.options.repeat--
                }
                this.emit('repeat', this)
            }
            else
            {
                this.eases.forEach(ease => this.complete(ease))
                this.emit('complete', this)
                return true
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
 * fires when easings are finished
 * @event EaseElement#complete
 * @type {EaseElement}
 */

/**
 * fires on each loop where there are easings
 * @event EaseElement#each
 * @type {EaseElement}
 */

/**
 * fires when easings repeats
 * @event EaseElement#repeat
 * @type {EaseElement}
 */

 /**
 * fires when easings reverse
 * @event EaseElement#reverse
 * @type {EaseElement}
 */

/**
 * fires on each frame while a wait is counting down
 * @event EaseElement#wait
 * @type {object}
 * @property {EaseElement} element
 * @property {number} wait
 */

/**
 * fires after a wait expires
 * @event EaseElement#wait-end
 * @type { EaseElement }
 */