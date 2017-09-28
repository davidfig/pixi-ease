const list = require('./src/list')

module.exports = {
    list,
    wait: require('./src/wait'),
    to: require('./src/to'),
    shake: require('./src/shake'),
    tint: require('./src/tint'),
    face: require('./src/face'),
    angle: require('./src/angle'),
    target: require('./src/target'),
    movie: require('./src/movie'),
    load: require('./src/load'),

    default: new list()
}