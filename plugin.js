if (!PIXI)
{
    console.error('pixi.js must be included before pixi.viewport')
}

const Ease = require('./src/index')

Object.assign(PIXI.extras, Ease)

module.exports = Ease