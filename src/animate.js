const _list = []
const _defaults = { ease: 'linear' }
let _ticker

/**
 * initialize (may be called more than once to change options without changing animation list but don't pass Ticker more than once)
 * @param {object} [options]
 * @param {PIXI.Ticker} [options.ticker] attaches to the PIXI.Ticker; if this is not provided, you need to call update() manually
 * @param {function|string} [options.ease=linear] default easing function
 */
function init(options)
{
    options = options || {}
    _defaults.ease = options.ease || _defaults.ease
    if (options.ticker)
    {
        _ticker = options.ticker
        options.ticker.add(ticker)
    }
}

/**
 * remove an animation
 * @param {object|array} animate - the animation (or array of animations) to remove - can be null
 */
function remove(animate)
{
    if (animate)
    {
        if (Array.isArray(animate))
        {
            while (animate.length)
            {
                const pop = animate.pop()
                if (pop && pop.options)
                {
                    pop.options.cancel = true
                }
            }
        }
        else
        {
            if (animate && animate.options)
            {
                animate.options.cancel = true
            }
        }
    }
}

// internal function to add an animation
function add(animate)
{
    _list.push(animate)
    return animate
}

function ticker()
{
    update(_ticker.elapsedMS)
}

/**
 * update function only needed if options.ticker is not provided
 * @param {number} elapsed time since last tick
 * @returns {number} of active animations
 */
function update(elapsed)
{
    let n = 0
    for (let i = _list.length - 1; i >= 0; i--)
    {
        const animate = _list[i]
        if (animate.update(elapsed))
        {
            _list.splice(i, 1)
        }
        else
        {
            if (!animate.options.pause)
            {
                n++
            }
        }
    }
    return n
}

module.exports = {
    init,
    update,
    remove,
    add,
    get defaults()
    {
        return _defaults;
    },
    wait: require('./wait'),
    to: require('./to'),
    shake: require('./shake'),
    tint: require('./tint'),
    face: require('./face'),
    angle: require('./angle'),
    target: require('./target'),
    movie: require('./movie'),
    load: require('./load')
}
