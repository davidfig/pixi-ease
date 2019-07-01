import * as PIXI from 'pixi.js'
import Random from 'yy-random'
import PixiEase from 'pixi-ease'

import { html } from '../html'
import { Ease } from '../../src/ease'

const SIZE = 10
let app, count = 10000

function setup()
{
    app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, resolution: window.devicePixelRatio, autoResize: true, transparent: true })
    document.body.appendChild(app.view)

    setupBoxes()
    setupButtons()
}

function setupBoxes()
{
    for (let i = 0; i < count; i++)
    {
        const box = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
        box.anchor.set(0.5)
        box.width = box.height = SIZE
        box.position.set(Random.get(window.innerWidth), Random.get(window.innerHeight))
        box.tint = Random.color()
    }
}

function runFast()
{
    const time = []
    time[0] = performance.now()
    const ease = new Ease({ duration: 1000 })
    time[1] = performance.now()
    for (let i = 0, _i = app.stage.children.length; i < _i; i++)
    {
        const sprite = app.stage.children[i]
        ease.add(sprite, { x: Random.get(window.innerWidth), y: Random.get(window.innerHeight), rotation: Random.angle() }, { reverse: true })
    }
    time[2] = performance.now()
    ease.on('complete', () =>
    {
        time[3] = performance.now()
        printResults('pixi-ease', time)
    })
}

function runEase()
{
    const time = []
    time[0] = performance.now()
    const ease = new PixiEase.list()
    time[1] = performance.now()
    let done
    for (let i = 0, _i = app.stage.children.length; i < _i; i++)
    {
        const sprite = app.stage.children[i]
        done = ease.to(sprite, { x: Random.get(window.innerWidth), y: Random.get(window.innerHeight), rotation: Random.angle() }, 1000, { reverse: true })
    }
    time[2] = performance.now()
    done.on('done', () =>
    {
        time[3] = performance.now()
        printResults('pixi-ease-old', time)
    })
}

function nice(a, b)
{
    return b - a
}

function printResults(name, time)
{
    console.log(`
        ${name}
        Initialize ease time: ${nice(time[0], time[1])}
        Add ease time: ${nice(time[1], time[2])}
        Animation time: ${nice(time[2], time[3])}
        Total time: ${nice(time[0], time[3])}
    `)
}

function setupButtons()
{
    const buttons = html({ parent: document.body, styles: { position: 'fixed', top: '50%', margin: '0.75em' } })
    const fast = html({ parent: buttons, styles: { padding: '0.5rem', margin: '0.5em', }, type: 'button', html: 'run pixi-ease (v2.0.0)' })
    fast.onclick = runFast
    const ease = html({ parent: buttons, styles: { padding: '0.5rem', margin: '0.5em', }, type: 'button', html: 'run pixi-ease (v1.3.0)' })
    ease.onclick = runEase
    buttons.style.left = window.innerWidth / 2 - buttons.offsetWidth / 2 + 'px'
}

window.onload = setup