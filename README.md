## pixi-ease
pixi.js animation library using easing functions

## rationale
This is a rewrite API for [YY-Animate](https://github.com/davidfig/animate). It provides an easy way to animate object parameters. It is optimized for use with pixi.js. 

YY-Animate used a global Animate object, which worked well, but created clean-up issues (e.g., when destroying a level, I had to be careful to destroy all the animations connected to that level). pixi-ease uses separate list objects, that can be created, updated, and destroyed independently of other lists. 

Additionally, I used eventemitter3 to create a more robust event system, replacing the onDone, onLoop, etc. options from YY-Animate.

## Installation

    npm i pixi-ease

## Live Demo
https://davidfig.github.io/pixi-ease/
    
## Simple Usage

    const PIXI = require('pixi.js')
    const Ease = require('pixi-ease')

    // initialize pixi.js
    const app = new PIXI.Application()
    document.body.appendChild(app.view)

    // create a square sprite
    const square = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    square.position.set(400, 300)
    square.tint = 0x0000ff
    square.width = square.height = 20

    // create list of animations
    const list = new Ease.list()

    // change square's tint from blue to red over 2 seconds; reverse and repeat
    list.tint(square, 0xff0000, 2000, { repeat: true, reverse: true }))

    // change square's location to (20, 55) over 2 seconds, and then return to the middle (uses alternative creation method)
    const to = list.add(new Ease.to(square, { x: 20, y: 55 }, 2000, { reverse: true })))

    // listen for done, then print to console
    to.on('done', () => console.log('Square has finished animating'))

    // start the list's animation loop
    list.start()

## API
### src/list.js
```js
/** Helper list for multiple animations */
module.exports = class List extends Loop
{
    /**
     * @param [options]
     * @param {number} [options.maxFrameTime=1000 / 60] maximum time in milliseconds for a frame
     * @param {object} [options.pauseOnBlur] pause loop when app loses focus, start it when app regains focus
     * @event List#done(List) final animation completed in the list
     * @event List#each(elapsed, List) each update
     */
    constructor(options)

    /**
     * Add animation(s) to animation list
     * @param {object|object[]...} any animation class
     */
    add()

    /**
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     * @inherited from yy-loop
     */
    // remove(animate)

    /**
     * remove all animations from list
     * @inherited from yy-loop
     */
    // removeAll()

    /**
     * update frame; can be called manually or automatically with start()
     */
    update()

    /**
     * @type {number} number of animations
     * @inherited yy-looop
     */
    // get count()

    /**
     * @type {number} number of active animations
     * @inherited yy-looop
     */
    // get countRunning()

    /**
     * starts an automatic requestAnimationFrame() loop based on yy-loop
     * alternatively, you can call update() manually
     * @inherited yy-loop
     */
    // start()

    /**
     * stops the automatic requestAnimationFrame() loop
     * @inherited yy-loop
     */
    // stop()

    /** helper to add to the list a new Ease.to class; see Ease.to class below for parameters */
    to() { return this.add(new To(...arguments)) }

    /** helper to add to the list a new Ease.angle class; see Ease.to class below for parameters */
    angle() { return this.add(new Angle(...arguments)) }

    /** helper to add to the list a new Ease.face class; see Ease.to class below for parameters */
    face() { return this.add(new Face(...arguments)) }

    /** helper to add to the list a new Ease.load class; see Ease.to class below for parameters */
    load() { return this.add(new Load(...arguments)) }

    /** helper to add to the list a new Ease.movie class; see Ease.to class below for parameters */
    movie() { return this.add(new Movie(...arguments)) }

    /** helper to add to the list a new Ease.shake class; see Ease.to class below for parameters */
    shake() { return this.add(new Shake(...arguments)) }

    /** helper to add to the list a new Ease.target class; see Ease.to class below for parameters */
    target() { return this.add(new Target(...arguments)) }

    /** helper to add to the list a new Ease.angle tint; see Ease.to class below for parameters */
    tint() { return this.add(new Tint(...arguments)) }

    /** helper to add to the list a new Ease.wait class; see Ease.to class below for parameters */
    wait() { return this.add(new Wait(...arguments)) }

    /** Inherited functions from yy-loop */


    /**
     * adds an interval
     * @param {function} callback
     * @param {number} time
     * @param {number} count
     * @inherited from yy-loop
     */
    // interval(callback, time, count)

    /**
     * adds a timeout
     * @param {function} callback
     * @param {number} time
     * @inherited from yy-loop
     */
    // timeout(callback, time)
```
### src/to.js
```js
/** animate any numeric parameter of an object or array of objects */
module.exports = class to extends wait
{
    /**
     * @param {object} object to animate
     * @param {object} goto - parameters to animate, e.g.: {alpha: 5, scale: {3, 5}, scale: 5, rotation: Math.PI}
     * @param {number} duration - time to run
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {boolean|number} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {boolean|number} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {boolean|number} [options.continue] true: continue animation with new starting values n: continue animation n times
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {string|Function} [options.ease] name or function from easing.js (see http://easings.net for examples)
     * @emits to:done animation expires
     * @emits to:cancel animation is cancelled
     * @emits to:wait each update during a wait
     * @emits to:first first update when animation starts
     * @emits to:each each update while animation is running
     * @emits to:loop when animation is repeated
     * @emits to:reverse when animation is reversed
     */
    constructor(object, goto, duration, options)

    /**
     * change or add a animation parameter
     * NOTE: the function extrapolates the starting value based on an average calculation without regard to easing function
     * @param {object} goto
     */
    modify(goto)
```
### src/angle.js
```js
/** animate object's {x, y} using an angle */
module.exports = class angle extends wait
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
```js
/** Rotates an object to face the target */
module.exports = class face extends wait
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
```js
/**
 * restart an animation = requires a saved state
 * @param {object} object(s) to animate
 */
module.exports = function load(object, load)
```
### src/movie.js
```js
/**
 * animate a movie of textures
 */
module.exports = class movie extends wait

    /**
     * @param {object} object to animate
     * @param {PIXI.Texture[]} textures
     * @param {number} [duration=0] time to run (use 0 for infinite duration--should only be used with customized easing functions)
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {(boolean|number)} [options.continue] true: continue animation with new starting values n: continue animation n times
     * @param {Function} [options.load] loads an animation using a .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function} [options.ease] function from easing.js (see http://easings.net for examples)
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
```js
/**
 * shakes an object or list of objects
 */
module.exports = class shake extends wait

    /**
     * @param {object|array} object or list of objects to shake
     * @param {number} amount to shake
     * @param {number} duration (in milliseconds) to shake
     * @param {object} options (see Animate.wait)
     */
    constructor(object, amount, duration, options)
```
### src/target.js
```js
/** move an object to a target's location */
module.exports = class target extends wait
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
```js
/** changes the tint of an object */
module.exports = class tint extends wait
{
    /**
     * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} object
     * @param {number|number[]} tint
     * @param {number} [duration] in milliseconds
     * @param {object} [options] @see {@link Wait}
     */
    constructor(object, tint, duration, options)
```
### src/wait.js
```js
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

    /**
     * @type {boolean} pause this entry
     */
    set pause(value)
```
## License 
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
