# pixi-ease
a simple and powerful pixi.js easing/tweening/animating library

Version 4 works with pixi.js v8. Use pixi-ease v3 for older versions of pixi.js.

## features
* ease any pixi.js parameter, including tint (using a blend function or stepped; accepts any pixi.js ColorSource, e.g., 0xff0000, 'red', or '#ff0000')
* use any Penner function by name or any user-defined function
* support for generic number parameters
* change scale or skew using one parameter (e.g., scale: 5 changes both scale.x and scale.y)
* set default durations and easing function for all eases
* uses eventemitter3 for events for both the easing lists and individual eases
* tracks eases on Container and cleans up when Container is destroyed
* includes a default easing list so you don't have to instantiate for simple cases
* includes a shake parameter
* good test coverage

## Live Demo
[https://davidfig.github.io/pixi-ease/](https://davidfig.github.io/pixi-ease/)

## Migrating to v4
* requires pixi.js v8 (peerDependency `pixi.js: ^8`)
* `PIXI.DisplayObject` is now `PIXI.Container` throughout the docs and types
* `tint` and `blend` accept any pixi.js `ColorSource` (numbers, color names, hex strings)
* the `ticker` option now works (pass `new Ease({ ticker: app.ticker })`); when a ticker is set, requestAnimationFrame is not used
* new `wait` option for `new Ease()` sets the default wait for every `add()`
* removed the undocumented `useTicker` and the unimplemented `removeExisting` option
* rewrote the TypeScript definitions, including typed events

## Migrating to v3
* changed default update loop to use requestAnimationFrame to remove the dependency on pixi.js
* to use PIXI.Ticker (like in v2), pass `new Ease({ ticker: PIXI.Ticker.shared })`
* ordinary usage should be unchanged

## Installation

    npm i pixi-ease pixi.js

or [grab the latest release](https://github.com/davidfig/pixi-ease/releases/) and use it:

```html
<script src="/directory-to-file/pixi.js"></script>
<script src="/directory-to-file/pixi-ease.js"></script>
<!-- or <script type="module" src="/directory-to-file/pixi-ease.es.js"></script> -->
<script>
    const ease = new Ease.Ease(options)
    Ease.add(...)
    // or Ease.ease.add(...)
</script> 
```

## API Documentation
[https://davidfig.github.io/pixi-ease/jsdoc/](https://davidfig.github.io/pixi-ease/jsdoc)

## Simple Usage
```js
import * as PIXI from 'pixi.js'
import { Ease, ease } from 'pixi-ease'

const app = new PIXI.Application()
await app.init()
const test = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
test.tint = 0x00ff00

const example = ease.add(test, { x: 20, y: 15, alpha: 0.25, rotation: 20, scale: 5, skewX: 0.25, blend: 'red' }, { reverse: true, duration: 2500, ease: 'easeInOutQuad' })
example.on('each', () => console.log('ease updated object during this frame'))
example.once('complete', () => console.log('move ease complete.'))

test.generic = 25
const generic = ease.add(test, { generic: 0 }, { duration: 1500, ease: 'easeOutQuad' })
generic.on('each', () => console.log(test.generic))

// use the app's ticker instead of requestAnimationFrame, with a default duration, wait, and ease
const secondEase = new Ease({ ticker: app.ticker, duration: 3000, wait: 1500, ease: 'easeInBack' })
const test2 = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
const loop = secondEase.add(test2, { tint: [0xff0000, 0x00ff00, 0x0000ff], scaleX: 2 }, { repeat: 3 })

// 'each' fires every frame; 'repeat' (or 'reverse' when reverse: true) fires at the end of each loop
loop.on('repeat', () => console.log('loop finished'))
```

## Tests

1. Clone repository
2. yarn install
3. yarn build
4. yarn test (type checks and Mocha tests)

### To run demo locally:
1. Clone repository
2. yarn install
3. yarn dev
4. open browser to http://localhost:10001

## Other Libraries
If you liked pixi-ease, please try my other open source libraries:
* [pixi-viewport](https://github.com/davidfig/pixi-viewport) - A highly configurable viewport/2D camera designed to work with pixi.js.
* [pixi-scrollbox](https://github.com/davidfig/pixi-scrollbox) - pixi.js scrollbox: a masked box that can scroll vertically or horizontally with scrollbars (uses pixi-ease)
* [intersects](https://github.com/davidfig/intersects) - a simple collection of 2d collision/intersects functions. Supports points, circles, lines, axis-aligned boxes, and polygons 

## License
MIT License (c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)