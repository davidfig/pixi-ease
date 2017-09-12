## animate.js
yet another javascript animation library (designed specifically for games and PIXI.js)

## Live Example
https://davidfig.github.io/animate/

## Installation

    npm install yy-animate

# API Reference
## Classes

<dl>
<dt><a href="#angle">angle</a></dt>
<dd><p>animate object&#39;s {x, y} using an angle</p>
</dd>
<dt><a href="#face">face</a></dt>
<dd><p>Rotates an object to face the target</p>
</dd>
<dt><a href="#movie">movie</a></dt>
<dd><p>animate a movie of textures</p>
</dd>
<dt><a href="#shake">shake</a></dt>
<dd><p>shakes an object or list of objects</p>
</dd>
<dt><a href="#target">target</a></dt>
<dd><p>move an object to a target&#39;s location</p>
</dd>
<dt><a href="#tint">tint</a></dt>
<dd><p>changes the tint of an object</p>
</dd>
<dt><a href="#to">to</a></dt>
<dd><p>animate any numeric parameter of an object or array of objects</p>
</dd>
<dt><a href="#wait">wait</a></dt>
<dd><p>base class for all animations</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#load">load(object(s), load, [options])</a></dt>
<dd><p>restart an animation = require(a saved state</p>
</dd>
</dl>

<a name="angle"></a>

## angle
animate object's {x, y} using an angle

**Kind**: global class  
<a name="new_angle_new"></a>

### new angle(object, angle, speed, [duration], [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> |  | to animate |
| angle | <code>number</code> |  | in radians |
| speed | <code>number</code> |  | in pixels/millisecond |
| [duration] | <code>number</code> | <code>0</code> | in milliseconds; if 0, then continues forever |
| [options] | <code>object</code> |  | @see [Wait](Wait) |

<a name="face"></a>

## face
Rotates an object to face the target

**Kind**: global class  
<a name="new_face_new"></a>

### new face(object, target, speed, [options])

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> |  |
| target | <code>Point</code> |  |
| speed | <code>number</code> | in radians/millisecond |
| [options] | <code>object</code> | @see [Wait](Wait) |
| [options.keepAlive] | <code>boolean</code> | don't stop animation when complete |

<a name="movie"></a>

## movie
animate a movie of textures

**Kind**: global class  
**Examples**: // animate sprite to (20, 20) over 1s using easeInOuTsine, and then reverse the animation
   new Animate.movie(sprite, [texture1, texture2, texture3], 500);  
<a name="new_movie_new"></a>

### new movie(object, textures, [duration], [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> |  | to animate |
| textures | <code>array</code> |  | parameters to animate, e.g.: {alpha: 5, scale: {x, 5} rotation: Math.PI} |
| [duration] | <code>number</code> | <code>0</code> | time to run (use 0 for infinite duration--should only be used with customized easing functions) |
| [options] | <code>object</code> |  |  |
| [options.wait] | <code>number</code> | <code>0</code> | n milliseconds before starting animation (can also be used to pause animation for a length of time) |
| [options.pause] | <code>boolean</code> |  | start the animation paused |
| [options.repeat] | <code>boolean</code> &#124; <code>number</code> |  | true: repeat animation forever; n: repeat animation n times |
| [options.reverse] | <code>boolean</code> &#124; <code>number</code> |  | true: reverse animation (if combined with repeat, then pulse); n: reverse animation n times |
| [options.continue] | <code>boolean</code> &#124; <code>number</code> |  | true: continue animation with new starting values; n: continue animation n times |
| [options.load] | <code>function</code> |  | loads an animation using a .save() object; note the * parameters below cannot be loaded and must be re-set |
| [options.ease] | <code>function</code> |  | function from easing.js (see http://easings.net for examples)* |
| [options.renderer] | <code>Renderer</code> |  | sets Renderer.dirty for each loop* |
| [options.onDone] | <code>function</code> |  | function pointer for when the animation expires* |
| [options.onCancel] | <code>function</code> |  | function pointer called after cancelled* |
| [options.onWait] | <code>function</code> |  | function pointer for wait* |
| [options.onFirst] | <code>function</code> |  | function pointer for first time update is called (does not include pause or wait time)* |
| [options.onEach] | <code>function</code> |  | function pointer called after each update* |
| [options.onLoop] | <code>function</code> |  | function pointer called after a revere, repeat, or continue* |

<a name="shake"></a>

## shake
shakes an object or list of objects

**Kind**: global class  
<a name="new_shake_new"></a>

### new shake(object, amount, duration, options)

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> &#124; <code>array</code> | or list of objects to shake |
| amount | <code>number</code> | to shake |
| duration | <code>number</code> | (in milliseconds) to shake |
| options | <code>object</code> | (see Animate.wait) |

<a name="target"></a>

## target
move an object to a target's location

**Kind**: global class  
<a name="new_target_new"></a>

### new target(object, target, speed, [options])
move to a target


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | object to animate |
| target | <code>object</code> | object needs to contain {x: x, y: y} |
| speed | <code>number</code> | number of pixels to move per millisecond |
| [options] | <code>object</code> | @see [Wait](Wait) |
| [options.keepAlive] | <code>boolean</code> | don't cancel the animation when target is reached |

<a name="tint"></a>

## tint
changes the tint of an object

**Kind**: global class  
<a name="new_tint_new"></a>

### new tint(object, tint, [duration], [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>PIXI.DisplayObject</code> &#124; <code>Array.&lt;PIXI.DisplayObject&gt;</code> |  |  |
| tint | <code>number</code> |  |  |
| [duration] | <code>number</code> | <code>0</code> | in milliseconds, if 0, repeat forever |
| [options] | <code>object</code> |  | @see [Wait](Wait) |

<a name="to"></a>

## to
animate any numeric parameter of an object or array of objects

**Kind**: global class  
**Examples**: // animate sprite to (20, 20) over 1s using easeInOuTsine, and then reverse the animation
   new Animate.to(sprite, {x: 20, y: 20}, 1000, {reverse: true, ease: Easing.easeInOutSine});

   // animate list of sprites to a scale over 10s after waiting 1s
   new Animate.to([sprite1, sprite2, sprite3], {scale: {x: 0.25, y: 0.25}}, 10000, {wait: 1000});  
<a name="new_to_new"></a>

### new to(object, goto, [duration], [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> |  | to animate |
| goto | <code>object</code> |  | parameters to animate, e.g.: {alpha: 5, scale: {x, 5} rotation: Math.PI} |
| [duration] | <code>number</code> | <code>0</code> | time to run (use 0 for infinite duration--should only be used with customized easing functions) |
| [options] | <code>object</code> |  |  |
| [options.wait] | <code>number</code> | <code>0</code> | n milliseconds before starting animation (can also be used to pause animation for a length of time) |
| [options.pause] | <code>boolean</code> |  | start the animation paused |
| [options.repeat] | <code>boolean</code> &#124; <code>number</code> |  | true: repeat animation forever; n: repeat animation n times |
| [options.reverse] | <code>boolean</code> &#124; <code>number</code> |  | true: reverse animation (if combined with repeat, then pulse); n: reverse animation n times |
| [options.continue] | <code>boolean</code> &#124; <code>number</code> |  | true: continue animation with new starting values; n: continue animation n times |
| [options.orphan] | <code>boolean</code> |  | delete animation if .parent of object (or first object in list) is null |
| [options.load] | <code>function</code> |  | loads an animation using an .save() object; note the * parameters below cannot be loaded and must be re-set |
| [options.ease] | <code>function</code> |  | function from easing.js (see http://easings.net for examples)* |
| [options.renderer] | <code>Renderer</code> |  | sets Renderer.dirty for each loop* |
| [options.onDone] | <code>function</code> |  | function pointer for when the animation expires* |
| [options.onCancel] | <code>function</code> |  | function pointer called after cancelled* |
| [options.onWait] | <code>function</code> |  | function pointer for wait* |
| [options.onFirst] | <code>function</code> |  | function pointer for first time update is called (does not include pause or wait time)* |
| [options.onEach] | <code>function</code> |  | function pointer called after each update* |
| [options.onLoop] | <code>function</code> |  | function pointer called after a revere, repeat, or continue* |

<a name="wait"></a>

## wait
base class for all animations

**Kind**: global class  
<a name="new_wait_new"></a>

### new wait(object, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| object | <code>object</code> |  | to animate |
| [options] | <code>object</code> |  |  |
| [options.wait] | <code>number</code> | <code>0</code> | n milliseconds before starting animation (can also be used to pause animation for a length of time) |
| [options.pause] | <code>boolean</code> |  | start the animation paused |
| [options.repeat] | <code>boolean</code> &#124; <code>number</code> |  | true: repeat animation forever; n: repeat animation n times |
| [options.reverse] | <code>boolean</code> &#124; <code>number</code> |  | true: reverse animation (if combined with repeat, then pulse); n: reverse animation n times |
| [options.continue] | <code>boolean</code> &#124; <code>number</code> |  | true: continue animation with new starting values; n: continue animation n times |
| [options.id] | <code>number</code> |  | user-generated id (e.g., I use it to properly load animations when an object has multiple animations running) |
| [options.orphan] | <code>boolean</code> |  | delete animation if .parent of object (or first object in list) is null |
| [options.load] | <code>function</code> |  | loads an animation using an .save() object; note the * parameters below cannot be loaded and must be re-set |
| [options.ease] | <code>function</code> &#124; <code>string</code> |  | function (or penner function name) from easing.js (see http://easings.net for examples)* |
| [options.renderer] | <code>Renderer</code> |  | sets Renderer.dirty for each loop* |
| [options.onDone] | <code>function</code> |  | function pointer for when the animation expires* |
| [options.onCancel] | <code>function</code> |  | function pointer called after cancelled* |
| [options.onWait] | <code>function</code> |  | function pointer for wait* |
| [options.onFirst] | <code>function</code> |  | function pointer for first time update is called (does not include pause or wait time)* |
| [options.onEach] | <code>function</code> |  | function pointer called after each update* |
| [options.onLoop] | <code>function</code> |  | function pointer called after a revere, repeat, or continue* |

<a name="load"></a>

## load(object(s), load, [options])
restart an animation = require(a saved state

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object(s) | <code>object</code> | to animate (cannot be saved) |
| load | <code>object</code> | object = require(.save() |
| [options] | <code>object</code> | include any additional options that cannot be saved (e.g., onDone function pointer) |


* * *

Copyright (c) 2016 YOPEY YOPEY LLC - MIT License - Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)