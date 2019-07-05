const Penner = require('penner')
const assert = require('chai').assert

require('./node-shim')
const Ease = require('../dist/ease.js')

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

    it('construction with options', () => {
        const penner = Penner.easeInOutQuad
        const ease = new Ease.Ease({ duration: 3000, ease: penner, useTicker: true, maxFrame: Infinity })
        assert.equal(ease.options.duration, 3000)
        assert.equal(ease.options.ease, penner)
        assert.equal(ease.options.useTicker, true)
        assert.equal(ease.options.maxFrame, Infinity)
        ease.destroy()
    })

    it('x, y', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, y: 0 }
        const e = ease.add(object, { x: 10, y: 20 }, { ease: 'linear' })
        e.on('each-x', results => {
            const percent = results.time / 1000
            assert.closeTo(object.x, 10 * percent, 0.01)
        })
        e.on('each-y', results => {
            const percent = results.time / 1000
            assert.closeTo(object.y, 20 * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('position', () => {
        const ease = new Ease.Ease()
        const object = { x: 0, y: 0 }
        const e = ease.add(object, { position: { x: 20, y: 10 } }, { ease: 'linear', repeat: 1 })
        e.on('each-position', results => {
            const percent = results.time / 1000
            assert.closeTo(object.x, 20 * percent, 0.01)
            assert.closeTo(object.y, 10 * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('width, height', () => {
        const ease = new Ease.Ease()
        const object = { width: 0, height: 0 }
        const e = ease.add(object, { width: 20, height: 30 }, { ease: 'linear' })
        e.on('each-width', results => {
            const percent = results.time / 1000
            assert.closeTo(object.width, 20 * percent, 0.01)
        })
        e.on('each-height', results => {
            const percent = results.time / 1000
            assert.closeTo(object.height, 30 * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('scale', () => {
        const ease = new Ease.Ease()
        const object = { scale: { x: 0, y: 0 } }
        const e = ease.add(object, { scale: 10 }, { ease: 'linear', repeat: 1 })
        e.on('each-scale', results => {
            const percent = results.time / 1000
            assert.closeTo(object.scale.x, 10 * percent, 0.01)
            assert.closeTo(object.scale.y, 10 * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('scaleX, scaleY', () => {
        const ease = new Ease.Ease()
        const object = { scale: { x: 0, y: 0 } }
        const e = ease.add(object, { scaleX: 10, scaleY: 20 }, { ease: 'linear', repeat: 1 })
        e.on('each-scaleX', results => {
            const percent = results.time / 1000
            assert.closeTo(object.scale.x, 10 * percent, 0.01)
        })
        e.on('each-scaleY', results => {
            const percent = results.time / 1000
            assert.closeTo(object.scale.y, 20 * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('alpha (and negative easing)', () => {
        const ease = new Ease.Ease()
        const object = { alpha: 1 }
        const e = ease.add(object, { alpha: 0 }, { ease: 'linear' })
        e.on('each-alpha', results => {
            const percent = results.time / 1000
            assert.closeTo(object.alpha, 1 - percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('rotation (and reverse: true)', () => {
        const ease = new Ease.Ease()
        const object = { rotation: 0 }
        const e = ease.add(object, { rotation: Math.PI }, { ease: 'linear', reverse: true })
        e.on('each-rotation', results => {
            const percent = results.time / 1000
            assert.closeTo(object.rotation, reverseCalled ? Math.PI * (1 - percent) : Math.PI * percent, 0.01)
        })
        let reverseCalled = false
        e.on('reverse-rotation', () => reverseCalled = true)
        ease.on('complete', () => {
            assert.isTrue(reverseCalled)
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
            assert.closeTo(object.rotation, face * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('skew', () => {
        const ease = new Ease.Ease()
        const object = { skew: { x: 0, y: 0 } }
        const e = ease.add(object, { skew: 10 }, { ease: 'linear', repeat: 1 })
        e.on('each-skew', results => {
            const percent = results.time / 1000
            assert.closeTo(object.skew.x, 10 * percent, 0.01)
            assert.closeTo(object.skew.y, 10 * percent, 0.01)
        })
        ease.on('complete', () => ease.destroy())
    })

    it('skewX, skewY', () => {
        const ease = new Ease.Ease()
        const object = { skew: { x: 0, y: 0 } }
        const e = ease.add(object, { skewX: 10, skewY: 20 }, { ease: 'linear', repeat: 1 })
        e.on('each-skewX', results => {
            const percent = results.time / 1000
            assert.closeTo(object.skew.x, 10 * percent, 0.01)
        })
        e.on('each-skewY', results => {
            const percent = results.time / 1000
            assert.closeTo(object.skew.y, 20 * percent, 0.01)
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
            assert.closeTo(object.generic, percent * 10, 0.01)
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
            assert.closeTo(object.generic, percent * 10, 0.01)
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
})