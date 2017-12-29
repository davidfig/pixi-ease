const PIXI = require('pixi.js')
const Random = require('yy-random')
const Counter = require('yy-counter')
const FPS = require('yy-fps')

const Ease = require('..')

const TIME = 1000
const SNOW_FALL = [2000, 8000]

let ease

function test()
{
    const textures = load()

    // initialize a list of animations
    ease = new Ease.list({ pauseOnBlur: true })

    // create a shake animation and add it to the list
    ease.shake(block(), 5)

    // create a movie with a list of textures and add it to the list
    ease.movie(block(), textures, TIME, { repeat: true, reverse: true })

    // create a target animation
    const b = block()
    b.x = blockSize / 2
    const target = ease.to(b, { x: window.innerWidth - blockSize }, TIME, { ease: 'easeInOutSine', reverse: true, repeat: true })

    // keeps the block facing the target (keepAlive means don't end the animation when the face is complete)
    ease.face(block(), target.object, 0.01, { keepAlive: true }),

    // moves the block toward a moving target (keepAlive means don't end the animation when the target is reached)
    ease.target(block(), target.object, 0.1, { keepAlive: true }),

    // full spin, and then reversed spin, etc.
    ease.to(block(), { rotation: Math.PI * 2 }, TIME * 3, { ease: 'easeInOutQuad', reverse: true, repeat: true }),

    // tint a block from current color to a new color, and then reverse and repeat
    ease.tint(block(), 0x888888, TIME, { repeat: true, reverse: true }),

    // tint a block through a series of colors starting at the current color; reverse and repeat
    ease.tint(block(), [0x00ff00, 0xff0000, 0x0000ff], TIME * 10, { repeat: true, reverse: true })

    // initialize without adding it to the list; will manually update it in the update function below
    // NOTE: scale may be called as { scale: number } or { scale: {x: number, y: number }}
    const to = new Ease.to(block(), { scale: 0 }, TIME, { repeat: true, reverse: true })

    // this sends a block off at an angle after waiting 1 second before starting
    ease.angle(block(), -0.1, 0.4, TIME, { repeat: true, reverse: true, wait: 1000 })

    // all lists and animation types have EventEmitters
    ease.on('each', update)

    // you can manually update individual animations without using Ease.list if you prefer
    function update(elapsed)
    {
        to.update(elapsed)
        counter.log('Eases: ' + ease.count)
    }
}

function fall()
{
    const block = snow()
    block.position.set(Random.get(window.innerWidth), -blockSize)
    const to = ease.to(block, { y: window.innerHeight + blockSize }, Random.range(SNOW_FALL[0], SNOW_FALL[1]))
    to.on('done', () => block.parent.removeChild(block))
}

function block(tint)
{
    const block = renderer.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    block.anchor.set(0.5)
    block.width = block.height = blockSize
    block.tint = typeof tint !== 'undefined' ? tint : Random.color()
    block.x = blockSize / 2
    block.y = blockSize / 2 + size * (renderer.stage.children.length - 1)
    return block
}

function snow(tint)
{
    const block = renderer.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    block.anchor.set(0.5)
    block.width = block.height = blockSize * 0.1
    block.alpha = 0.2
    block.rotation = Random.angle()
    block.tint = typeof tint !== 'undefined' ? tint : Random.color()
    return block
}

let renderer, size, blockSize, counter, fps

function init()
{
    fps = new FPS()
    renderer = new PIXI.Application({ transparent: true, width: window.innerWidth, height: window.innerHeight, autoResize: true })
    document.body.appendChild(renderer.view)
    size = Math.min(window.innerWidth, window.innerHeight) / 11
    blockSize = size * 0.9
    counter = new Counter({ side: 'bottom-left' })
    PIXI.ticker.shared.add(() => fps.frame())
}

function load()
{
    const textures = []
    for (let i = 1; i <= 5; i++)
    {
        textures.push(PIXI.Texture.fromImage('images/' + i + '.png'))
    }
    return textures
}

window.onload = function ()
{
    init()
    test()
    ease.on('each', fall)

    require('fork-me-github')('https://github.com/davidfig/pixi-ease')
    require('./highlight')()
}