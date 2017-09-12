## pixi-ease
pixi.js animation library using easing functions

## Installation

    npm i pixi-ease

## Live Example
https://davidfig.github.io/pixi-ease/

## Simple Usage

    const PIXI = require('pixi.js')
    const Ease = require('pixi-ease')

    // initialize pixi.js and create a square sprite
    const app = new PIXI.Application()
    document.body.appendChild(app.view)
    const square = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    square.position.set(400, 300)
    square.tint = 0x0000ff
    square.width = square.height = 20

    // initial ease with a default easing function and attach to PIXI's default ticker
    Ease.init({ ease: 'easeInOutSine', ticker: PIXI.ticker.shared })

    // change square's tint from blue to red over 2 seconds
    new Ease.tint(square, 0xff0000, 2000)

    // change square's location to (20, 55) over 2 seconds, and then return to the middle
    const to = new Ease.to(square, { x: 20, y: 55 }, 2000, { reverse: true })

    // listen for done, then print to console
    to.on('done', () => console.log('Square has finished animating'))

## API
### src/animate.js
```

/**
 * initialize (may be called more than once to change options without changing animation list but don't pass Ticker more than once)
 * @param {object} [options]
 * @param {PIXI.Ticker} [options.ticker] attaches to the PIXI.Ticker; if this is not provided, you need to call update() manually
 * @param {function|string} [options.ease=linear] default easing function
 */
function init(options)

/**
 * remove an animation
 * @param {object|array} animate - the animation (or array of animations) to remove - can be null
 */
function remove(animate)

/**
 * update function only needed if options.ticker is not provided
 * @param {number} elapsed time since last tick
 * @returns {number} of active animations
 */
function update(elapsed)
```
### src/angle.js
```

/**
 * @file src/angle.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/** animate object's {x, y} using an angle */
class angle extends wait
{
    /**
     * @param {object} object to animate
     * @param {number} angle in radians
     * @param {number} speed in pixels/millisecond
     * @param {number} [duration=0] in milliseconds; if 0, then continues forever
     * @param {object} [options] @see {@link Wait}
     */
    constructor(object, angle, speed, duration, options)
```
### src/face.js
```

/**
 * @file src/face.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/** Rotates an object to face the target */
class face extends wait
{
    /**
     * @param {object} object
     * @param {Point} target
     * @param {number} speed in radians/millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't stop animation when complete
     */
    constructor(object, target, speed, options)
```
### src/load.js
```

/**
 * @file load.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/**
 * restart an animation = requires a saved state
 * @param {object} object(s) to animate (cannot be saved)
 */

```
### src/movie.js
```

/**
 * @file to.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/**
 * animate a movie of textures
 * @examples
 *
 *    // animate sprite to (20, 20) over 1s using easeInOuTsine, and then reverse the animation
 *    new Animate.movie(sprite, [texture1, texture2, texture3], 500);
 */
class movie extends wait

    /**
     * @param {object} object to animate
     * @param {array} textures - parameters to animate, e.g.: {alpha: 5, scale: {x, 5} rotation: Math.PI}
     * @param {number} [duration=0] - time to run (use 0 for infinite duration--should only be used with customized easing functions)
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever; n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse); n: reverse animation n times
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values; n: continue animation n times
     * @param {Function} [options.load] loads an animation using a .save() object; note the * parameters below cannot be loaded and must be re-set
     * @param {Function} [options.ease] function from easing.js (see http://easings.net for examples)*
     * @emits {done} animation expires
     * @emits {cancel} animation is cancelled
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, textures, duration, options)
```
### src/shake.js
```

/**
 * @file animate.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/**
 * shakes an object or list of objects
 */
class shake extends wait

    /**
     * @param {object|array} object or list of objects to shake
     * @param {number} amount to shake
     * @param {number} duration (in milliseconds) to shake
     * @param {object} options (see Animate.wait)
     */
    constructor(object, amount, duration, options)
```
### src/target.js
```

/**
 * @file src/target.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/** move an object to a target's location */
class target extends wait
{
    /**
     * move to a target
     * @param {object} object - object to animate
     * @param {object} target - object needs to contain {x: x, y: y}
     * @param {number} speed - number of pixels to move per millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't cancel the animation when target is reached
     */
    constructor(object, target, speed, options)
```
### src/tint.js
```

/**
 * @file tint.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/** changes the tint of an object */
class tint extends wait
{
    /**
     * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} object
     * @param {number} tint
     * @param {number} [duration=0] in milliseconds, if 0, repeat forever
     * @param {object} [options] @see {@link Wait}
     */
    constructor(object, tint, duration, options)
```
### src/to.js
```

/**
 * @file to.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2016
 * {@link https://github.com/davidfig/animate}
 */


/**
 * animate any numeric parameter of an object or array of objects
 * @examples
 *
 *    // animate sprite to (20, 20) over 1s using easeInOuTsine, and then reverse the animation
 *    new Animate.to(sprite, {x: 20, y: 20}, 1000, {reverse: true, ease: Easing.easeInOutSine});
 *
 *    // animate list of sprites to a scale over 10s after waiting 1s
 *    new Animate.to([sprite1, sprite2, sprite3], {scale: {x: 0.25, y: 0.25}}, 10000, {wait: 1000});
 */
class to extends wait

    /**
     * @param {object} object to animate
     * @param {object} goto - parameters to animate, e.g.: {alpha: 5, scale: {x, 5} rotation: Math.PI}
     * @param {number} [duration=0] - time to run (use 0 for infinite duration--should only be used with customized easing functions)
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever; n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse); n: reverse animation n times
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values; n: continue animation n times
     * @param {boolean} [options.orphan] delete animation if .parent of object (or first object in list) is null
     * @param {Function} [options.load] loads an animation using an .save() object; note the * parameters below cannot be loaded and must be re-set
     * @param {Function} [options.ease] function from easing.js (see http://easings.net for examples)*
     * @emits {done} animation expires
     * @emits {cancel} animation is cancelled
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, goto, duration, options)
```
### src/wait.js
```

/**
 * @file wait.js
 * @author David Figatner
 * @license MIT
 * @copyright YOPEY YOPEY LLC 2017
 * {@link https://github.com/davidfig/animate}
 */


    /**
     * @param {object|object[]} object or list of objects to animate
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values n: continue animation n times
     * @param {number} [options.id] user-generated id (e.g., I use it to properly load animations when an object has multiple animations running)
     * @param {boolean} [options.orphan] delete animation if .parent of object (or first object in list) is null
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function|string} [options.ease] function (or penner function name) from easing.js (see http://easings.net for examples)*
     * @emits {done} animation expires
     * @emits {cancel} animation is cancelled
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    constructor(object, options)
```
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
