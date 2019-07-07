const PIXI = require('pixi.js')
const ease = require('../../').ease

let block, width, height

function rand(n)
{
    return Math.round(Math.random() * n)
}

function move()
{
    const e = ease.add(block, { x: rand(width), y: rand(height), rotation: rand(2 * Math.PI) }, { duration: 1000 + rand(1000) }) //, removeExisting })
    e.once('complete', () => move())
}

window.onload = () =>
{
    const app = new PIXI.Application({ autoresize: true })
    app.view.style.textAlign = 'center'
    document.body.appendChild(app.view)
    width = app.view.width
    height = app.view.height
    const div = document.createElement('div')
    div.innerHTML = '<div>Browserify <a href="https://https://github.com/davidfig/pixi-ease">pixi-ease</a></div>'
    document.body.appendChild(div)

    block = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    block.tint = 0x00ff00
    block.anchor.set(0.5)

    move()
}