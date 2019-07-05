const Penner = require('penner')
const assert = require('chai').assert

require('./node-shim')
const Ease = require('../dist/ease.js')

const CLOSE_TO = 0.0000001

describe('pixi-ease', () =>
{
    it('contructor with default options', () =>
    {
        const ease = new Ease.Ease()
        assert.equal(ease.options.duration, 1000)
        assert.isFunction(ease.options.ease)
        assert.equal(ease.options.useTicker, true)
        assert.equal(ease.options.maxFrame, 1000 / 60)
        ease.destroy()
    })

    it('constructor with options', () => {
        const penner = Penner.easeInOutQuad
        const ticker = { add: () => {}, remove: () => {} }
        const ease = new Ease.Ease({ duration: 3000, ease: penner, useTicker: true, maxFrame: Infinity, ticker })
        assert.equal(ease.options.duration, 3000)
        assert.equal(ease.options.ease, penner)
        assert.equal(ease.options.useTicker, true)
        assert.equal(ease.options.maxFrame, Infinity)
        ease.destroy()
    })

    it('constructor with no ticker', () => {
        const ease = new Ease.Ease({ useTicker: false })
        const e = ease.add({ x: 5 }, { x: 10 })
        let each = false
        e.on('each-x', () => each = true)
        requestAnimationFrame(() => {
            assert.isFalse(each)
        })
    })

    it('x, y', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, y: 0 }
        const e = ease.add(object, { x: 10, y: 20 }, { ease: 'linear', repeat: 1 })
        assert.equal(e.element, object)
        assert.equal(e.ease, ease)
        e.on('each-x', results => {
            const percent = results.time / 1000
            assert.closeTo(object.x, 10 * percent, CLOSE_TO)
        })
        e.on('each-y', results => {
            const percent = results.time / 1000
            assert.closeTo(object.y, 20 * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('position', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, y: 0 }
        const e = ease.add(object, { position: { x: 20, y: 10 } }, { ease: 'linear', reverse: true })
        let reversed = false
        e.on('reverse-position', () => reversed = true)
        e.on('each-position', results => {
            const percent = results.time / 1000
            assert.closeTo(object.x, 20 * (reversed ? 1 - percent : percent), CLOSE_TO)
            assert.closeTo(object.y, 10 * (reversed ? 1 - percent : percent), CLOSE_TO)
        })
        ease.on('complete', () => {
            assert.isTrue(reversed)
            ease.destroy()
        })
    })

    it('width, height', () => {
        const ease = new Ease.Ease()
        const object = { width: 0, height: 0 }
        const e = ease.add(object, { width: 20, height: 30 }, { ease: 'linear' })
        e.on('each-width', results => {
            const percent = results.time / 1000
            assert.closeTo(object.width, 20 * percent, CLOSE_TO)
        })
        e.on('each-height', results => {
            const percent = results.time / 1000
            assert.closeTo(object.height, 30 * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('scale', () => {
        const ease = new Ease.Ease()
        const object = { scale: { x: 0, y: 0 } }
        const e = ease.add(object, { scale: 10 }, { ease: 'linear', repeat: 1 })
        e.on('each-scale', results => {
            const percent = results.time / 1000
            assert.closeTo(object.scale.x, 10 * percent, CLOSE_TO)
            assert.closeTo(object.scale.y, 10 * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('scaleX, scaleY', () => {
        const ease = new Ease.Ease()
        const object = { scale: { x: 0, y: 0 } }
        const e = ease.add(object, { scaleX: 10, scaleY: 20 }, { ease: 'linear', repeat: 1 })
        e.on('each-scaleX', results => {
            const percent = results.time / 1000
            assert.closeTo(object.scale.x, 10 * percent, CLOSE_TO)
        })
        e.on('each-scaleY', results => {
            const percent = results.time / 1000
            assert.closeTo(object.scale.y, 20 * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('alpha (and negative easing)', () => {
        const ease = new Ease.Ease()
        const object = { alpha: 1 }
        const e = ease.add(object, { alpha: 0 }, { ease: 'linear' })
        e.on('each-alpha', results => {
            const percent = results.time / 1000
            assert.closeTo(object.alpha, 1 - percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('rotation (and reverse: true)', () => {
        const ease = new Ease.Ease()
        const object = { rotation: 0 }
        const e = ease.add(object, { rotation: Math.PI }, { ease: 'linear', reverse: true })
        e.on('each-rotation', results => {
            const percent = results.time / 1000
            assert.closeTo(object.rotation, reversed ? Math.PI * (1 - percent) : Math.PI * percent, CLOSE_TO)
        })
        let reversed = false
        e.on('reverse-rotation', () => reversed = true)
        ease.on('complete', () => {
            assert.isTrue(reversed)
            ease.destroy()
        })
    })

    it('face', () => {
        const ease = new Ease.Ease({ ease: 'linear' })
        const object = { x: 0, y: 0, rotation: 0 }
        const target = { x: 20, y: 20 }
        const e = ease.add(object, { face: target })
        const face = Math.atan2(target.y - object.y, target.x - object.x)
        e.on('each-face', results => {
            const percent = results.time / 1000
            assert.closeTo(object.rotation, face * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('skew', () => {
        const ease = new Ease.Ease()
        const object = { skew: { x: 0, y: 0 } }
        const e = ease.add(object, { skew: 10 }, { ease: 'linear', repeat: 1 })
        e.on('each-skew', results => {
            const percent = results.time / 1000
            assert.closeTo(object.skew.x, 10 * percent, CLOSE_TO)
            assert.closeTo(object.skew.y, 10 * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('skewX, skewY', () => {
        const ease = new Ease.Ease()
        const object = { skew: { x: 0, y: 0 } }
        const e = ease.add(object, { skewX: 10, skewY: 20 }, { ease: 'linear', repeat: 1 })
        e.on('each-skewX', results => {
            const percent = results.time / 1000
            assert.closeTo(object.skew.x, 10 * percent, CLOSE_TO)
        })
        e.on('each-skewY', results => {
            const percent = results.time / 1000
            assert.closeTo(object.skew.y, 20 * percent, CLOSE_TO)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('tint (and Ease.ease)', () => {
        const object = { tint: 0 }
        const e = Ease.ease.add(object, { tint: [1, 2, 3] }, { ease: 'linear' })
        const interval = 1000 / 3
        e.on('each-tint', results => {
            if (results.time < interval)
            {
                assert.equal(object.tint, 1)
            }
            else if (results.time < interval * 2)
            {
                assert.equal(object.tint, 2)
            }
            else if (results.time < interval * 3)
            {
                assert.equal(object.tint, 3)
            }
        })
        Ease.ease.on('complete', () => Ease.ease.destroy())
    })

    it('blend', () => {
        // todo: make this a better test for blend
        const object = { tint: 0xffffff }
        const ease = new Ease.Ease({ ease: 'linear' })
        const e = ease.add(object, { blend: 0 })
        ease.on('complete', () => {
            assert.equal(object.tint, 0)
            ease.destroy()
        })
    })

    it('generic (repeat: 2)', () => {
        const object = { generic: 0 }
        const ease = new Ease.Ease({ ease: 'linear' })
        const e = ease.add(object, { generic: 10 }, { repeat: 2 })
        e.on('each-generic', results => {
            const percent = results.time / 1000
            assert.closeTo(object.generic, percent * 10, CLOSE_TO)
        })
        let count = 0
        e.on('repeat-generic', () => count++)
        ease.on('complete', () => {
            assert.equal(count, 2)
            ease.destroy()
        })
    })

    it('generic (wait)', () => {
        const object = { generic: 0 }
        const ease = new Ease.Ease({ ease: 'linear' })
        const e = ease.add(object, { generic: 10 }, { wait: 100 })
        let waitGeneric = false
        let waitEndGeneric = false
        e.once('wait-generic', () => waitGeneric = true)
        e.on('wait-end-generic', () => waitEndGeneric = true)
        e.on('each-generic', results => {
            const percent = results.time / 1000
            assert.closeTo(object.generic, percent * 10, CLOSE_TO)
        })
        ease.on('complete', () => {
            assert.isTrue(waitGeneric)
            assert.isTrue(waitEndGeneric)
            ease.destroy()
        })
    })

    it('shake', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, y: 0 }
        const e = ease.add(object, { shake: 5 }, { duration: 100 })
        e.on('each-shake', () => {
            assert.isAtLeast(object.x, -5)
            assert.isAtMost(object.x, 5)
            assert.isAtLeast(object.y, -5)
            assert.isAtMost(object.y, 5)
        })
        e.on('complete-shake', () => {
            assert.equal(object.x, 0)
            assert.equal(object.y, 0)
            ease.destroy()
        })
    })

    it('countElements, countRunning, removeAll', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, y: 0, rotation: 0, tint: 0 }
        ease.add(object, { x: 10 })
        ease.add(object, { y: 10 })
        ease.add(object, { rotation: Math.PI })
        assert.equal(ease.countElements(), 1)
        assert.equal(ease.countRunning(), 3)
        ease.removeAll()
        assert.equal(ease.countElements(), 0)
        assert.equal(ease.countRunning(), 0)
        ease.destroy()
    })

    it('duration, ease', () => {
        const ease = new Ease.Ease()
        ease.duration = 500
        assert.equal(ease.duration, 500)
        ease.ease = 'easeInOutQuad'
        assert.equal(ease.ease, 'easeInOutQuad')
        const e = ease.add({ x: 0 }, { x: 5 })
        assert.equal(e.eases[0].options.duration, 500)
        assert.isFunction(e.eases[0].options.ease)
        ease.destroy()
    })

    it('waitForRemoveAll', () => {
        const ease = new Ease.Ease()
        const e = ease.add({ x: 0 }, { x: 5 })
        assert.equal(e.count, 1)
        e.once('each-x', () => {
            ease.removeAll()
        })
        requestAnimationFrame(() =>
        {
            assert.equal(ease.countRunning(), 0)
            ease.destroy()
        })
    })

    it('removeEase', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, rotation: 0 }
        const e = ease.add(object, { x: 5, rotation: Math.PI })
        assert.equal(e.count, 2)
        ease.removeEase(object, ['x', 'rotation'])
        assert.equal(e.count, 0)
        ease.destroy()
    })

    it('waitForRemoveEase', () => {
        const ease = new Ease.Ease()
        const object = { x: 0 }
        const e = ease.add(object, { x: 5 })
        assert.equal(e.count, 1)
        e.once('each-x', () => {
            ease.removeEase(object, 'x')
        })
        requestAnimationFrame(() =>
        {
            assert.equal(ease.countRunning(), 0)
            ease.destroy()
        })
    })

    it('waitRemoveAllEases', () => {
        const ease = new Ease.Ease()
        const object = { x: 0 }
        const e = ease.add(object, { x: 5 })
        assert.equal(e.count, 1)
        e.once('each-x', () => {
            ease.removeAllEases(object)
        })
        requestAnimationFrame(() =>
        {
            assert.equal(ease.countRunning(), 0)
            ease.destroy()
        })
    })

    it('multiple object eases', () => {
        const ease = new Ease.Ease()
        const object1 = { x: 0, y: 0 }
        const object2 = { x: 10, y: 10 }
        const e = ease.add([object1, object2], { position: { x: 20, y: 30 } }, { ease: 'linear', repeat: 1 })
        e[0].on('each-position', results => {
            const percent = results.time / 1000
            assert.closeTo(object1.x, 20 * percent, CLOSE_TO)
            assert.closeTo(object1.y, 30 * percent, CLOSE_TO)
        })
        e[1].on('each-position', results => {
            const percent = results.time / 1000
            assert.closeTo(object2.x, 10 + 10 * percent, CLOSE_TO)
            assert.closeTo(object2.y, 10 + 20 * percent, CLOSE_TO)
        })
        let complete1 = false
        let complete2 = false
        e[0].on('complete-position', () => complete1 = true)
        e[1].on('complete-position', () => complete2 = true)
        ease.on('complete', () => {
            assert.isTrue(complete1)
            assert.isTrue(complete2)
            ease.destroy()
        })
    })

    it('Ease.list deprecated message', () => {
        new Ease.List()
    })

    it('multiple eases on same object', () => {
        const ease = new Ease.Ease({ ease: 'linear' })
        const object = { x: 0, y: 0 }
        const e1 = ease.add(object, { x: 10 })
        e1.on('each-x', results => {
            const percent = results.time / 1000
            assert.closeTo(object.x, percent * 10, CLOSE_TO)
        })
        requestAnimationFrame(() =>
        {
            const e2 = ease.add(object, { y: 20 })
            assert.equal(e1, e2)
            e1.on('each-y', results => {
                const percent = results.time / 1000
                assert.closeTo(object.y, percent * 20, CLOSE_TO)
            })
        })
        ease.on('complete', () => ease.destroy())
    })

    it('removeExisting', () => {
        const ease = new Ease.Ease({ ease: 'linear' })
        const object = { x: 5, y: 6, scale: { x: 10, y: 11 }, skew: { x: 2, y: 3} }
        ease.add(object, { x: 10, y: 8, scale: 4, skew: 3 })
        ease.add(object, { x: 2, y: 1, scale: 0, skew: 2 }, { duration: 500, removeExisting: true })
        ease.on('complete', () => {
            assert.equal(object.x, 2)
            assert.equal(object.y, 1)
            assert.equal(object.scale.x, 0)
            assert.equal(object.scale.y, 0)
            assert.equal(object.skew.x, 2)
            assert.equal(object.skew.y, 2)
            ease.destroy()
        })
    })

    it('destroyed element', () => {
        const ease = new Ease.Ease()
        const object = { x: 0 }
        ease.add(object, { x: 10 })
        requestAnimationFrame(() => {
            object._destroyed = true
            requestAnimationFrame(() => {
                assert.equal(ease.countRunning(), 0)
                ease.destroy()
            })
        })
    })
})