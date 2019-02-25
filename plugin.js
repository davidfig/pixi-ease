if (typeof PIXI === 'undefined')
{
    console.error('pixi.js must be included before pixi-ease')
}

const Ease = require('./src/index')

Object.assign(PIXI.extras, Ease)

module.exports = Ease