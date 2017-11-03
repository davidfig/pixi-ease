const PIXI = require('pixi.js')
const Renderer = require('yy-renderer')
const Random = require('yy-random')
const FPS = require('yy-fps')
const Counter = require('yy-counter')
const Input = require('yy-input')

const Ease = require('..')

const TIME = 1000
const BLOCKS = 12

function test()
{
    const textures = load()

    // initialize a list of animations
    const ease = new Ease.list({ pauseOnBlur: true })

    // create a shake animation and add it to the list
    ease.shake(block(), 5)

    // create a movie with a list of textures and add it to the list
    ease.movie(block(), textures, TIME, { repeat: true, reverse: true })

    // create a target animation
    const b = block()
    b.x = size / 2
    const target = ease.to(b, { x: window.innerWidth - size / 2 }, TIME, { ease: 'easeInOutSine', reverse: true, repeat: true })
    // this is an alternative way to create and add animations to the list
    ease.add(

        // keeps the block facing the target (keepAlive means don't end the animation when the face is complete)
        new Ease.face(block(), target.object, 0.01, { keepAlive: true }),

        // moves the block toward a moving target (keepAlive means don't end the animation when the target is reached)
        new Ease.target(block(), target.object, 0.1, { keepAlive: true }),

        // full spin, and then reversed spin, etc.
        new Ease.to(block(), { rotation: Math.PI * 2 }, TIME * 3, { ease: 'easeInOutQuad', reverse: true, repeat: true }),

        // tint a block from current color to a new color, and then reverse and repeat
        new Ease.tint(block(), 0x888888, TIME, { repeat: true, reverse: true }),

        // tint a block through a series of colors starting at the current color; reverse and repeat
        new Ease.tint(block(), [0x00ff00, 0xff0000, 0x0000ff], TIME * 10, { repeat: true, reverse: true })
    )

    // initialize without adding it to the list; will manually update it in the update function below
    // NOTE: scale may be called as { scale: number } or { scale: {x: number, y: number }}
    const to = new Ease.to(block(), { scale: 0 }, TIME, { repeat: true, reverse: true })

    // this sends a block off at an angle after waiting 1 second before starting
    ease.angle(block(), -0.1, 0.4, TIME, { repeat: true, reverse: true, wait: 1000 })

    // test ease.to.modify() - this allows user to modify the values during the ease
    const mover = block()
    let change = ease.to(mover, {x: mover.x, y: mover.y}, TIME, { ease: 'easeInOutSine' })
    change.on('done', () => change = ease.to(mover, { x: mover.x, y: mover.y }, TIME, { ease: 'easeInOutSine' }))
    const input = new Input()
    input.on('move', (x, y) => change.modify({ x, y }))

    // all lists and animation types have EventEmitters
    ease.on('each', update)

    // you can manually update individual animations without using Ease.list if you prefer
    function update(elapsed)
    {
        to.update(elapsed)
    }

    // render at the end of each loop
    ease.interval(
        function ()
        {
            app.render()
            fps.frame()
            counter.log('Eases: ' + ease.count)
        })

    // starts the animations
    ease.start()
}

function block(tint)
{
    const block = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    block.anchor.set(0.5)
    block.width = block.height = size * 0.9
    block.tint = typeof tint !== 'undefined' ? tint : Random.color()
    block.x = size / 2
    block.y = size / 2 + size * (app.stage.children.length - 1)
    return block
}

let app, size, fps, counter

function init()
{
    app = new Renderer()
    size = Math.min(window.innerWidth, window.innerHeight) / BLOCKS
    fps = new FPS()
    counter = new Counter({ side: 'bottom-left' })
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

    require('fork-me-github')('https://github.com/davidfig/pixi-ease')
    require('./highlight')()
}