const PIXI = require('pixi.js')
const Random = require('yy-random')

const Animate = require('..')

const TIME = 1000

let size, last = performance.now()
const app = pixi()
const textures = load()
const list = new Animate.list()

const target = list.add(new Animate.to(block(), { x: window.innerWidth - size / 2 }, TIME, { ease: 'easeInOutSine', reverse: true, repeat: true }))
list.add(new Animate.face(block(), target.object, 0.01, { keepAlive: true }))
list.add(new Animate.target(block(), target.object, 0.1, { keepAlive: true }))
list.add(new Animate.to(block(), { rotation: Math.PI * 2 }, TIME, { ease: 'easeInOutQuad', reverse: true, repeat: true }))
list.add(new Animate.tint(block(), 0x888888, TIME, { repeat: true, reverse: true }))
list.add(new Animate.tint(block(), [0x00ff00, 0xff0000, 0x0000ff], TIME * 10, { repeat: true, reverse: true }))
list.add(new Animate.angle(block(), -0.1, 0.4, TIME, { repeat: true, reverse: true }))
list.add(new Animate.shake(block(), 5))
list.add(new Animate.movie(block(), textures, TIME, { repeat: true, reverse: true }))

function update()
{
    const now = performance.now()
    const elapsed = now - last
    last = now
    list.update(elapsed)
    requestAnimationFrame(update)
}
update()

require('./highlight.js')

function pixi()
{
    const app = new PIXI.Application({ transparent: true })
    document.body.appendChild(app.view)
    app.view.position = 'absolute'
    app.renderer.resize(window.innerWidth, window.innerHeight)
    size = Math.min(window.innerWidth, window.innerHeight) / 10
    return app
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

/* globals performance, requestAnimationFrame */