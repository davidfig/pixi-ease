import * as PIXI from 'pixi.js'
import { ease, EaseDisplayObject } from '../..'

let block: PIXI.Sprite
let width: number
let height: number

function rand(n: number)
{
    return Math.round(Math.random() * n)
}

function move()
{
    const e: EaseDisplayObject = <EaseDisplayObject>ease.add(block, { x: rand(width), y: rand(height), rotation: rand(2 * Math.PI) }, { duration: 1000 + rand(1000) }) //, removeExisting })
    e.once('complete', () => move())
}

window.onload = () =>
{
    const app = new PIXI.Application()
    app.view.style.textAlign = 'center'
    document.body.appendChild(app.view)
    width = app.view.width
    height = app.view.height
    const div = document.createElement('div')
    div.innerHTML = '<div>Typescript + Rollup <a href="https://https://github.com/davidfig/pixi-ease">pixi-ease</a></div>'
    document.body.appendChild(div)

    block = <PIXI.Sprite>app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    block.tint = 0x00ff00
    block.anchor.set(0.5)

    move()
}