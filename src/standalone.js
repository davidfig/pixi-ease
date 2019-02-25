const Ease = {
    list: require('./list'),
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

if (PIXI.extras)
{
    PIXI.extras.Ease = Ease
}
else
{
    PIXI.extras = { Ease }
}

module.exports = Ease