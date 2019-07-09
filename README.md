# pixi-ease
a simple and powerful pixi.js easing/tweening/animating library

## features
* ease any pixi.js parameter, including tint (using a blend function or stepped)
* use any Penner function by name or any user-defined function
* support for generic number parameters
* change scale or skew using one parameter (e.g., scale: 5 changes both scale.x and scale.y)
* set default durations and easing function for all eases
* uses eventemitter3 for events for both the easing lists and individual eases
* tracks eases on DisplayObject and cleans up when DisplayObject is destroyed
* includes a default easing list so you don't have to instantiate for simple cases
* includes a shake parameter
* good test coverage

## Live Demo
[https://davidfig.github.io/pixi-ease/](https://davidfig.github.io/pixi-ease/)

## Migrating from pixi-ease v1 to v2

```js
// v1 code
// -------
// const Ease = require('pixi-ease')
// const ease = new Ease.list()
// const moveSquare = ease.to(square, { x: 20, y: 55 }, 2000, { reverse: true })
// moveSquare.on('done', () => console.log('ease complete.'))

// v2 code
//--------
import { ease } from 'pixi-ease'
// or const ease = require('pixi-ease').ease

const moveSquare = ease.add(square, { x: 20, y: 55 }, { duration: 2000, reverse: true })
moveSquare.on('complete', () => console.log('ease complete.'))

// you can also create separate easing groups, similar to how Ease.List worked, and include default settings
import { Ease } from 'pixi-ease'
// or const Ease = require('pixi-ease').Ease

const easeList = new Ease({ duration: 1000, ease: 'easeOutQuad' })
easeList.add('square', { tintBlend: [0xff0000, 0x00ff00] })

// DURATION MOVED INTO OPTIONS
// -------------------------------
// v1 code
// -------
// ease.to(square, { x: 20 }, 200, { ease: 'easeInOutSine' })

// v2 code
// -------
ease.add(square, { x: 20 }, { duration: 200, ease: 'easeInOutSine' })
```

## Installation

    yarn add pixi-ease

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
const test = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
test.tint = 0x00ff00

const example = ease.add(test, { x: 20, y: 15, alpha: 0.25, rotation: 20, scale: 5, skewX: 0.25, blend: 0xff0000 } }, { reverse: true, duration: 2500, ease: 'easeInOutQuad' })
example.on('each', () => console.log('ease updated object during frame using PIXI.Ticker.'))
example.once('complete', () => console.log('move ease complete.'))

test.generic = 25
const generic = ease.add(test, { generic: 0 }, { duration: 1500, ease: 'easeOutQuad' })
generic.on('each', () => console.log(test.generic))

const secondEase = new Ease({ duration: 3000, wait: 1500, ease: 'easeInBack', repeat: 3 })
const test2 = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
secondEase.add(test2, { tint: [0xff0000, 0x00ff00, 0x000ff], scaleX: 2 })
```

## Build Examples
I've included a bunch of build examples in the builds directory, including: [browserify](https://github.com/davidfig/pixi-ease/tree/master/builds/browserify), [rollup](https://github.com/davidfig/pixi-ease/tree/master/builds/rollup), [standalone (e.g., cdn)](https://github.com/davidfig/pixi-ease/tree/master/builds/standalone), [standalone (pixi.js v4)](https://github.com/davidfig/pixi-ease/tree/master/builds/standalone-v4), and [typescript](https://github.com/davidfig/pixi-ease/tree/master/builds/typescript).
  
## Tests

1. Clone repository
2. yarn install
3. yarn test (for Mocha test code)
4. yarn coverage (for Instanbul coverage)

### To run demo locally:
1. Clone repository
2. yarn install
3. yarn build 
4. yarn dev
5. open browser to http://localhost:10001

### To run build examples:
1. Clone repository
2. yarn install
3. yarn build
4. yarn builds
5. yarn test-builds
6. open browser to http://localhost:5000

## Other Libraries
If you liked pixi-ease, please try my other open source libraries:
* [pixi-viewport](https://github.com/davidfig/pixi-viewport) - A highly configurable viewport/2D camera designed to work with pixi.js.
* [pixi-scrollbox](https://github.com/davidfig/pixi-scrollbox) - pixi.js scrollbox: a masked box that can scroll vertically or horizontally with scrollbars (uses pixi-ease)
* [intersects](https://github.com/davidfig/intersects) - a simple collection of 2d collision/intersects functions. Supports points, circles, lines, axis-aligned boxes, and polygons 

## License
MIT License (c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)