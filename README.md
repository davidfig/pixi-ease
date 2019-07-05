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
* full test coverage

## Live Demo
[https://davidfig.github.io/pixi-ease/](https://davidfig.github.io/pixi-ease/)

## Migrating from pixi-ease v1 to v2

```js
// v1 code
// -------
const Ease = require('pixi-ease')
const ease = new Ease.list()
const moveSquare = ease.to(square, { x: 20, y: 55 }, 2000, { reverse: true })
moveSquare.on('done', () => console.log('ease complete.'))

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
ease.to(square, { x: 20 }, 200, { ease: 'easeInOutSine' })

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
[https://davidfig.github.io/dom-ease/jsdoc/](https://davidfig.github.io/dom-ease/jsdoc)

## Simple Usage
```js
import * as PIXI from 'pixi.js'
import { Ease, ease } from 'pixi-ease'

const app = new PIXI.Application()
const test = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))

const move = ease.add(test, { x: 20, y: 15, alpha: 0.25 }, { reverse: true })
move.once('complete', () => console.log('move ease complete.'))

test.generic = 25
const generic = ease.add(test, { generic: 0 }, { duration: 1500, ease: 'easeOutQuad' })
generic.on('each', () => console.log(test.generic))

const secondEase = new Ease({ duration: 3000, ease: 'easeInBack' })
const test2 = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
test2.tint = 0x0000ff
secondEase.add(test2, { tintBlend: [0xff0000, 0x00ff00], scale: 2 })
```

## License 
MIT License  
(c) 2019 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)