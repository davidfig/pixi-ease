import * as PIXI from 'pixi.js'
import Random from 'yy-random'
import FPS from 'yy-fps'
import fork from 'fork-me-github'

import { html } from './html'
import { highlight } from './highlight'
import { ease } from '../src/ease'

const SIZE = 50
let app, y = 0,
    fps = new FPS(),
    boxes = []

function setup()
{
    app = new PIXI.Application({ view: document.querySelector('.view'), width: window.innerWidth, height: window.innerHeight, resolution: window.devicePixelRatio, autoResize: true, transparent: true })
    ease.duration = 2000

    // track fps in the ticker
    PIXI.Ticker.shared.add(() => fps.frame())

    startEases()
    setupButtons()
}

function startEases()
{
    resetEases()

    y = 0
    ease.add(box('scaleX'), { scaleX: 2 }, { repeat: true })
    ease.add(box('scaleY'), { scaleY: 2 }, { repeat: true, reverse: true })
    ease.add(box('scale'), { scale: 0 }, { repeat: true, reverse: true })
    ease.add(box('x/y'), { x: window.innerWidth / 2, y: window.innerHeight / 2 }, { repeat: true, reverse: true })
    ease.add(box('target'), { target: { x: window.innerWidth / 2, y: 0 } }, { repeat: true, reverse: true })
    ease.add(box('tint').sprite, { tint: [0xff0000, 0x00ff00, 0x0000ff] }, { repeat: true, ease: 'linear' })
    ease.add(box('tintBlend').sprite, { tintBlend: [0xff0000, 0x00ff00, 0x0000ff] }, { repeat: true, duration: 5000, ease: 'linear' })
    ease.add(box('shake'), { shake: 5 }, { repeat: true })
    ease.add(box('alpha'), { alpha: 0 }, { repeat: true, reverse: true })
    ease.add(box('width'), { width: SIZE * 2 }, { repeat: true, reverse: true })
    ease.add(box('height'), { height: 0 }, { repeat: true, reverse: true })
    ease.add(box('rotation'), { rotation: 2 * Math.PI }, { repeat: true, reverse: true })
    ease.add(box('skew'), { skew: 2 * Math.PI }, { repeat: true, reverse: true })
    ease.add(box('skewX'), { skewX: 2 * Math.PI }, { repeat: true, reverse: true })
    ease.add(box('skewY'), { skewY: 2 * Math.PI }, { repeat: true, reverse: true })
    ease.add(box('all'), { scale: 2, target: { x: window.innerWidth / 2, y: window.innerHeight / 2 }, alpha: 0.5, skew: 2 * Math.PI, rotation: 2 * Math.PI }, { repeat: true, reverse: true })
}

function resetEases()
{
    while (boxes.length)
    {
        const box = boxes.pop()
        app.stage.removeChild(box)
    }
}

function setupButtons()
{
    const buttons = html({ parent: document.body, styles: { position: 'fixed', bottom: 0, left: 0, margin: '0.75em' } })
    const remove = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'cancel all animations' })
    remove.onclick = () =>
    {
        if (remove.innerHTML === 'cancel all animations')
        {
            ease.removeAll()
            remove.innerHTML = 'add all animations'
        }
        else
        {
            ease.add(boxes[0], { scaleX: 2 }, { repeat: true })
            ease.add(boxes[1], { scaleY: 2 }, { repeat: true, reverse: true })
            ease.add(boxes[2], { scale: 0 }, { repeat: true, reverse: true })
            ease.add(boxes[3], { x: window.innerWidth / 2, y: window.innerHeight / 2 }, { repeat: true, reverse: true })
            ease.add(boxes[4], { target: { x: window.innerWidth / 2, y: 0 } }, { repeat: true, reverse: true })
            ease.add(boxes[5].sprite, { tint: [0xff0000, 0x00ff00, 0x0000ff] }, { repeat: true, ease: 'linear' })
            ease.add(boxes[6].sprite, { tintBlend: [0xff0000, 0x00ff00, 0x0000ff] }, { repeat: true, duration: 5000, ease: 'linear' })
            ease.add(boxes[7], { shake: 5 }, { repeat: true })
            ease.add(boxes[8], { alpha: 0 }, { repeat: true, reverse: true })
            ease.add(boxes[9], { width: SIZE * 2 }, { repeat: true, reverse: true })
            ease.add(boxes[10], { height: 0 }, { repeat: true, reverse: true })
            ease.add(boxes[11], { rotation: 2 * Math.PI }, { repeat: true, reverse: true })
            ease.add(boxes[12], { skew: 2 * Math.PI }, { repeat: true, reverse: true })
            ease.add(boxes[13], { skewX: 2 * Math.PI }, { repeat: true, reverse: true })
            ease.add(boxes[14], { skewY: 2 * Math.PI }, { repeat: true, reverse: true })
            ease.add(boxes[15], { scale: 2, target: { x: window.innerWidth / 2, y: window.innerHeight / 2 }, alpha: 0.5, skew: 2 * Math.PI, rotation: 2 * Math.PI }, { repeat: true, reverse: true })
            remove.innerHTML = 'cancel all animations'
        }
    }
    const reset = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'reset boxes' })
    reset.onclick = () => startEases()

    const api = html({ parent: buttons, type: 'button', styles: { margin: '5px' }, html: 'API documentation' })
    api.onclick = () => window.location.href = 'jsdoc/'
}

function box(words)
{
    const container = app.stage.addChild(new PIXI.Container())
    container.position.set(SIZE, y)
    const sprite = container.sprite = container.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    sprite.width = sprite.height = SIZE
    sprite.tint = Random.color()
    if (words)
    {
        const text = container.addChild(new PIXI.Text(words, { fill: 'white', fontSize: '1.25em' }))
        text.anchor.set(0.5)
        text.position.set(SIZE / 2, SIZE / 2)
    }
    y += SIZE
    boxes.push(container)
    return container
}

window.onload = function()
{
    setup()
    fork()
    highlight()
}