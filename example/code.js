const PIXI = require('pixi.js')
const Debug = require('yy-debug')
const Animate = require('../src/animate')

// set up pixi and shapes
let _app, _red, _green, _blue, _shaker, _pacman
const theDots = [], animates = []
pixi()

Debug.init()

// intialize update loop for Animate with optional debug info
Animate.init({ease: 'easeInOutSine', ticker: _app.ticker})

// red triangle fades, moves, and scales repeats and reverses forever
animates[0] = new Animate.to(_red, {alpha: 0.1, x: 500, y: 500, scale: {x: 5, y: 5}}, 1000,
    {repeat: true, reverse: true, ease: 'easeInOutSine'})

// green triangle moves, rotates, and fades when done
const green = new Animate.to(_green, { x: 50, y: 400, rotation: 2 * Math.PI }, 2500, { reverse: true, ease: 'easeInSine' })
green.on('done', (object) => new Animate.to(object, { alpha: 0 }, 2000))

// blue triangle spins forever
animates[1] = new Animate.to(_blue, {rotation: -2 * Math.PI}, 1000, {continue: true})

// circle changes = require(blue to red and reverse and repeats
animates[2] = new Animate.tint(_shaker, 0xff0000, 2000, {repeat: true, reverse: true})

// circle shakes forever, it starts after 1 second (also testing array of objects)
animates[3] = new Animate.shake([_shaker], 5, 0, {wait: 1000})

// animate a group that is not a container
animates[4] = new Animate.to(theDots, {alpha: 0.1, scale: {x: 2, y: 2}}, 2000, {repeat: true, reverse: true, ease: 'easeInOutSine'})
animates[8] = new Animate.tint(theDots, 0x00ff00, 1000, {repeat: true, reverse: true})

// pacman mouth animation
const pacman = new Animate.to(_pacman, {angle: 0.01}, 250, {repeat: true, reverse: true})
pacman.on('each', () =>
    _pacman.clear()
        .moveTo(Math.cos(_pacman.angle) * _pacman.radius / 2, Math.sin(_pacman.angle) * _pacman.radius / 2)
        .lineStyle(_pacman.radius, 0xffff00)
        .arc(0, 0, _pacman.radius / 2, Math.PI * _pacman.angle, Math.PI * -_pacman.angle, false)
)

let count = 0
const number = new Animate.to(null, null, 1000, { repeat: true })
number.on('loop', () => Debug.one('This should change every 1s (' + count++ + ')'))

let rotate
// pacman walking animation
function nextTarget()
{
    let target = {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}

    // rotate pacman around the short way to the target
    Animate.remove(rotate)
    rotate = new Animate.face(_pacman, target, 0.01)
    return target
}


function onDoneTarget()
{
    target = nextTarget()
    animates[7].target = target
}
let target = nextTarget()
animates[7] = new Animate.target(_pacman, target, 0.15, {keepAlive: true})
animates[7].on('done', onDoneTarget)
// pointer facing pacman
var facing = pointer(100, 0x00ffff)
facing.position.set(600, 400)
animates[6] = new Animate.face(facing, _pacman, 0.00075, {keepAlive: true})

// angle movement
function onEachAngle()
{
    if (circleAngle.x > window.innerWidth || circleAngle.x < 0 || circleAngle.y > window.innerHeight || circleAngle.y < 0)
    {
        circleAngle.position.set(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
        animates[5].angle = Math.random() * Math.PI * 2
    }
}

var circleAngle = _app.stage.addChild(PIXI.Sprite.fromImage('circle.png'))
circleAngle.anchor.set(0.5)
circleAngle.tint = 0xff00ff
circleAngle.width = circleAngle.height = 50
circleAngle.position.set(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
animates[5] = new Animate.angle(circleAngle, Math.random(), 0.1, 0)
animates[5].on('each', onEachAngle)

var faces = []
for (let i = 1; i <= 7; i++)
{
    faces.push(PIXI.Texture.fromImage('faces/happy-' + i + '.png'))
}
var smile = new PIXI.Sprite(faces[0])
smile.position.set(550, 50)
_app.stage.addChild(smile)
new Animate.movie(smile, faces, 1500, {repeat: true, reverse: true})

require('./highlight.js')

function pixi()
{
    _app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
    document.body.appendChild(_app.view)
    _red = triangle(100, 0xff0000)
    _red.position.set(50, 50)
    _green = triangle(50, 0x00ff00)
    _green.position.set(300,300)
    _blue = triangle(50, 0x0000ff)
    _blue.position.set(500,100)
    _shaker = PIXI.Sprite.fromImage('circle.png')
    _app.stage.addChild(_shaker)
    _shaker.tint = 0x0000ff
    _shaker.position.set(200, 200)
    dots(800, 250, 150, 10)
    pacmanCreate(100, 100, 100, 100)
}

function triangle(size, color)
{
    var half = size / 2
    var g = _app.stage.addChild(new PIXI.Graphics())
    g.beginFill(color)
    g.moveTo(0, -half)
    g.lineTo(-half, half)
    g.lineTo(half, half)
    g.closePath()
    g.endFill()
    return g
}

function pointer(size, color)
{
    var g = new PIXI.Graphics()
    _app.stage.addChild(g)
    g.beginFill(color)
    g.drawCircle(0, 0, size / 2)
    g.endFill()
    g.lineStyle(10, color)
    g.moveTo(0, 0)
    g.lineTo(size, 0)
    g.closePath()
    g.rotation = -Math.PI
    return g
}

function dots(x, y, distance)
{
    for (let i = 0; i < 100; i++)
    {
        let sprite = PIXI.Sprite.fromImage('circle.png')
        sprite.anchor.set(0.5)
        sprite.alpha = 0.5
        sprite.tint = 0xff00ff
        _app.stage.addChild(sprite)
        theDots.push(sprite)
        const angle = Math.random() * 2 * Math.PI
        const dist = Math.random() * distance
        sprite.x = x + Math.cos(angle) * dist
        sprite.y = y + Math.sin(angle) * dist
    }
}

function pacmanCreate(x, y, size)
{
    _pacman = _app.stage.addChild(new PIXI.Graphics())
    _pacman.position.set(x, y)
    _pacman.radius = size / 2
    _pacman.angle = 0.3
}

// add a debug panel for instructions
function instructions()
{
    function a(n)
    {
        return animates[n] ? '<span style="background: rgba(0,255,0,0.25)">save and cancel </span>' : '<span style="background: rgba(255,0,0,0.25)">load and resume </span>'
    }
    let s = ''
    s += 'Press 1 to ' + a(0) + 'red triangle animation (.to)<br>'
    s += 'Press 2 to ' + a(1) + 'blue triangle animation (.to)<br>'
    s += 'Press 3 to ' + a(2) + 'red-to-blue circle animation (.tint)<br>'
    s += 'Press 4 to ' + a(3) + 'shaking circle animation (.to)<br>'
    s += 'Press 5 to ' + a(4) + 'lots of pink dots animation (.to with array)<br>'
    s += 'Press 6 to ' + a(5) + 'pink circle animation (.angle)<br>'
    s += 'Press 7 to ' + a(6) + 'pointer animation (.face)<br>'
    s += 'Press 8 to ' + a(7) + 'pacman animation (.target)'

    Debug.one(s, {panel: saveload})
}
const saveload = Debug.add('saveload', {side: 'leftbottom'})

instructions()
Debug.resize()

const save = []

document.body.addEventListener('keypress',
    function(e)
    {
        const code = (typeof e.which === 'number') ? e.which : e.keyCode
        if (code >= 49 && code < 49 + animates.length)
        {
            const i = code - 49
            if (animates[i])
            {
                save[i] = animates[i].save()
                Animate.remove(animates[i])
                animates[i] = null
            }
            else
            {
                switch (i)
                {
                    case 0:
                        animates[i] = Animate.load(_red, save[i])
                        break
                    case 1:
                        animates[i] = Animate.load(_blue, save[i])
                        break
                    case 2:
                        animates[i] = Animate.load(_shaker, save[i])
                        break
                    case 3:
                        animates[i] = Animate.load([_shaker], save[i])
                        break
                    case 4:
                        animates[i] = Animate.load(theDots, save[i])
                        break
                    case 5:
                        animates[i] = Animate.load(circleAngle, save[i])
                        animates[i].on('each', onEachAngle)
                        break
                    case 6:
                        animates[i] = Animate.load([facing, _pacman], save[i])
                        break
                    case 7:
                        animates[i] = Animate.load([_pacman, target], save[i], {onDone: onDoneTarget})
                        break
                }
            }
            instructions()
        }
        else Debug.log(code, {panel: saveload})
    }
)