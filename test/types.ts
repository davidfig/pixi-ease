// compile-only check of @types/index.d.ts (run with yarn test:types)
import { Container, Sprite, Ticker } from 'pixi.js'
import { Ease, Easing, ease } from 'pixi-ease'

const sprite = new Sprite()
const container = new Container()

const easing: Easing = ease.add(sprite, { x: 20, position: { x: 1, y: 2 }, face: container, tint: ['red', 0x00ff00], blend: '#0000ff', generic: 5 }, { reverse: true, wait: 100 })
easing.on('complete', (e: Easing) => e.count)
easing.on('repeat', () => {})
easing.on('wait-end', () => {})

const custom = new Ease({ ticker: Ticker.shared, wait: 500, ease: 'easeInBack' })
custom.on('each', (e: Ease) => e.count)
custom.add([sprite, container], { scale: 2 })
custom.target(sprite, container, 0.5)
custom.face(sprite, { x: 0, y: 0 }, 0.01, { repeat: 2 })
custom.removeEase(sprite, ['x', 'y'])
custom.destroy()
