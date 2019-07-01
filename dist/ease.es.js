import * as PIXI from 'pixi.js';
import { VERSION } from 'pixi.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var penner = createCommonjsModule(function (module, exports) {
/*
	Copyright © 2001 Robert Penner
	All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, 
	are permitted provided that the following conditions are met:

	Redistributions of source code must retain the above copyright notice, this list of 
	conditions and the following disclaimer.
	Redistributions in binary form must reproduce the above copyright notice, this list 
	of conditions and the following disclaimer in the documentation and/or other materials 
	provided with the distribution.

	Neither the name of the author nor the names of contributors may be used to endorse 
	or promote products derived from this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
	EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
	AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
	OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
  var penner, umd;

  umd = function(factory) {
    {
      return module.exports = factory;
    }
  };

  penner = {
    linear: function(t, b, c, d) {
      return c * t / d + b;
    },
    easeInQuad: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      }
    },
    easeInCubic: function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    },
    easeInQuart: function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      } else {
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    easeInQuint: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    easeInSine: function(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(t, b, c, d) {
      if (t === 0) {
        return b;
      } else {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
      }
    },
    easeOutExpo: function(t, b, c, d) {
      if (t === d) {
        return b + c;
      } else {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
      }
    },
    easeInOutExpo: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      } else {
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    easeInCirc: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      } else {
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    easeInElastic: function(t, b, c, d) {
      var a, p, s;
      s = 1.70158;
      p = 0;
      a = c;
      if (t === 0) ; else if ((t /= d) === 1) ;
      if (!p) {
        p = d * .3;
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(t, b, c, d) {
      var a, p, s;
      s = 1.70158;
      p = 0;
      a = c;
      if (t === 0) ; else if ((t /= d) === 1) ;
      if (!p) {
        p = d * .3;
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(t, b, c, d) {
      var a, p, s;
      s = 1.70158;
      p = 0;
      a = c;
      if (t === 0) ; else if ((t /= d / 2) === 2) ;
      if (!p) {
        p = d * (.3 * 1.5);
      }
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      } else {
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      }
    },
    easeInBack: function(t, b, c, d, s) {
      if (s === void 0) {
        s = 1.70158;
      }
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(t, b, c, d, s) {
      if (s === void 0) {
        s = 1.70158;
      }
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(t, b, c, d, s) {
      if (s === void 0) {
        s = 1.70158;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      } else {
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      }
    },
    easeInBounce: function(t, b, c, d) {
      var v;
      v = penner.easeOutBounce(d - t, 0, c, d);
      return c - v + b;
    },
    easeOutBounce: function(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
      }
    },
    easeInOutBounce: function(t, b, c, d) {
      var v;
      if (t < d / 2) {
        v = penner.easeInBounce(t * 2, 0, c, d);
        return v * .5 + b;
      } else {
        v = penner.easeOutBounce(t * 2 - d, 0, c, d);
        return v * .5 + c * .5 + b;
      }
    }
  };

  umd(penner);

}).call(commonjsGlobal);
});

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

class EaseDisplayObject extends eventemitter3
{
    /**
     * each DisplayObject has its own EaseElement object returned by add() or accessed through DisplayObject.__ease_{$id}
     * @extends EventEmitter
     * @fires EaseElement#complete
     * @fires EaseElement#each-*
     * @fires EaseElement#complete-*
     * @fires EaseElement#loop-*
     * @fires EaseElement#wait-*
     * @fires EaseElement#wait-end-*
     */
    constructor(element, ease)
    {
        super();

        /**
         * element being animated
         * @member {PIXI.DisplayObject}
         */
        this.element = element;
        this.ease = ease;
        this.eases = [];
        this.connected = true;
    }

    addParam(entry, param, options)
    {
        let start, to, delta, update, name;
        switch (entry)
        {
            case 'scaleX':
            case 'skewX':
                name = entry.substr(0, entry.length - 1);
                start = this.element[name].x;
                to = param;
                delta = param - start;
                update = (ease) => this.updateCoord(ease, entry, name, 'x');
                break

            case 'scaleY':
            case 'skewY':
                name = entry.substr(0, entry.length - 1);
                start = this.element[name].y;
                to = param;
                delta = param - start;
                update = (ease) => this.updateCoord(ease, entry, name, 'y');
                break

            case 'tint':
            case 'tintBlend':
                start = 0;
                to = 1;
                delta = 1;
                const colors = !Array.isArray(param) ? [param] : param;
                const tint = this.element.tint;
                colors.unshift(tint ? tint : 0xffffff);
                const interval = 1 / colors.length;
                update = (entry === 'tint') ? (ease) => this.updateTint(ease, entry, colors, interval) : (ease) => this.updateBlend(ease, entry, colors, interval);
                break

            case 'shake':
                start = { x: this.element.x, y: this.element.y };
                to = param;
                update = (ease) => this.updateShake(ease);
                break

            default:
                start = this.element[entry];
                to = param;
                delta = param - start;
                update = (ease) => this.updateOne(ease, entry);
        }

        const eases = this.eases;
        let i;
        for (i = 0; i < eases.length; i++)
        {
            if (eases[i].entry === entry)
            {
                break
            }
        }
        const add = { entry, options, update, start, to, delta, time: 0, wait: options.wait || 0 };
        if (i !== eases.length)
        {
            this.eases[i] = add;
        }
        this.eases.push(add);
    }

    add(params, options)
    {
        for (let entry in params)
        {
            const opts = { ease: options.ease, duration: options.duration, repeat: options.repeat, reverse: options.reverse };
            const param = params[entry];
            if (entry === 'scale')
            {
                this.addParam('scaleX', param, opts);
                this.addParam('scaleY', param, opts);
            }
            else if (entry === 'skew')
            {
                this.addParam('skewX', param, opts);
                this.addParam('skewY', param, opts);
            }
            else if (entry === 'target')
            {
                this.addParam('x', param.x, opts);
                this.addParam('y', param.y, opts);
            }
            else
            {
                this.addParam(entry, param, opts);
            }
        }
    }

    updateOne(ease, entry)
    {
        this.element[entry] = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration);
    }

    updateCoord(ease, entry, name, coord)
    {
        this.element[name][coord] = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration);
    }

    updateTint(ease, entry, colors, interval)
    {
        const percent = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration);
        const index = Math.floor(percent / interval);
        this.element.tint = colors[index];
    }

    updateBlend(ease, entry, colors, interval)
    {
        const percent = ease.options.ease(ease.time, ease.start, ease.delta, ease.options.duration);
        let index = Math.floor(percent / interval);
        index = index === colors.length ? index - 1 : index;
        let next = index + 1;
        if (next === colors.length)
        {
            next = ease.options.reverse ? index - 1 : 0;
        }
        const percentBlend = (percent % interval) / interval;
        const color1 = colors[index];
        const color2 = colors[next];
        if (percentBlend === 0)
        {
            return color1
        }
        if (percentBlend === 1)
        {
            return color2
        }
        var r1 = color1 >> 16;
        var g1 = color1 >> 8 & 0x0000ff;
        var b1 = color1 & 0x0000ff;
        var r2 = color2 >> 16;
        var g2 = color2 >> 8 & 0x0000ff;
        var b2 = color2 & 0x0000ff;
        var percent1 = 1 - percentBlend;
        var r = percent1 * r1 + percent * r2;
        var g = percent1 * g1 + percent * g2;
        var b = percent1 * b1 + percent * b2;
        this.element.tint = r << 16 | g << 8 | b;
    }

    updateShake(ease)
    {
        function random(n)
        {
            return Math.floor(Math.random() * n) - Math.floor(n / 2)
        }
        this.element.x = ease.start.x + random(ease.to);
        this.element.y = ease.start.y + random(ease.to);
    }

    reverse(ease)
    {
        const swap = ease.to;
        ease.to = ease.start;
        ease.start = swap;
        ease.delta = -ease.delta;
    }

    update(elapsed)
    {
        if (this.element._destroyed)
        {
            delete this.element[this.key];
            return true
        }
        const eases = this.eases;
        for (let i = 0, _i = eases.length; i < _i; i++)
        {
            const ease = eases[i];
            if (ease.wait !== 0)
            {
                ease.wait -= elapsed;
                if (ease.wait <= 0)
                {
                    ease.wait = 0;
                    this.emit('wait-end-' + ease.name, ease.element);
                }
                else
                {
                    this.emit('wait-' + ease.entry, { element: this.element, wait: ease.wait });
                    continue
                }
            }
            const duration = ease.options.duration;
            let leftover = 0;
            if (ease.time + elapsed > duration)
            {
                leftover = ease.time + elapsed - duration;
                ease.time = duration;
            }
            else
            {
                ease.time += elapsed;
            }
            ease.update(ease);
            if (ease.time >= ease.options.duration)
            {
                const options = ease.options;
                if (options.reverse)
                {
                    this.emit('loop-' + ease.name, ease.element);
                    this.reverse(ease);
                    ease.time = leftover;
                    if (!options.repeat)
                    {
                        options.reverse = false;
                    }
                    else if (options.repeat !== true)
                    {
                        options.repeat--;
                    }
                }
                else if (options.repeat)
                {
                    ease.time = leftover;
                    if (options.repeat !== true)
                    {
                        options.repeat--;
                    }
                }
                else
                {
                    this.emit('complete-' + ease.entry, this.element);
                    eases.splice(i, 1);
                    i--;
                    _i--;
                }
            }
            this.emit('each-' + ease.entry, this.element);
        }
        this.emit('each', this);
        if (Object.keys(eases).length === 0)
        {
            this.emit('complete', this);
            this.connected = false;
            return true
        }
    }

    /**
     * number of parameters being eased
     * @returns {number}
     */
    get count()
    {
        return Object.keys(this.eases)
    }
}

/**
 * fires when there are no more animations for this DisplayObject
 * @event EaseElement#complete
 * @type {EaseElement}
 */

/**
 * fires when the parameter completes the ease
 * where name is the name of the parameter being eased (e.g., complete-x)
 * @event EaseElement#complete-*
 * @type {EaseElement}
 */

/**
 * fires on each loop where there are animations
 * where * is the name of the parameter being eased (e.g., each-rotation)
 * @event EaseElement#each-*
 * @type {EaseElement}
 */

/**
 * fires when an animation repeats or reverses
 * where * is the name of the parameter being eased (e.g., complete-skewX)
 * @event EaseElement#loop-*
 * @type {EaseElement}
 */

/**
 * fires on each loop while a wait is counting down
 * where * is the name fo the parameter being eased (e.g., wait-end-y)
 * @event EaseElement#wait-*
 * @type {object}
 * @property {EaseElement} element
 * @property {number} wait
 */

/**
 * fires after a wait expires for a parameter
 * where * is the name fo the parameter being eased (e.g., wait-end-y)
 * @event EaseElement#wait-end-*
 * @type { EaseElement }
 */

const easeOptions = {
    duration: 1000,
    ease: penner.easeInOutSine,
    useTicker: true
};

/**
 * Manages a group of eases
 * @extends EventEmitter
 * @example
 * import * as PIXI from 'pixi.js'
 * import { Ease, ease } from 'pixi-ease'
 *
 * const app = new PIXI.Application()
 * const test = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
 *
 * const move = ease.add(test, { x: 20, y: 15, alpha: 0.25 }, { reverse: true })
 * move.once('complete', () => console.log('move ease complete.'))
 *
 * test.generic = 25
 * const generic = ease.add(test, { generic: 0 }, { duration: 1500, ease: 'easeOutQuad' })
 * generic.on('each', () => console.log(test.generic))
 *
 * const secondEase = new Ease({ duration: 3000, ease: 'easeInBack' })
 * const test2 = app.stage.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
 * test2.tint = 0x0000ff
 * secondEase.add(test2, { tintBlend: [0xff0000, 0x00ff00], scale: 2 })
 */
class Ease extends eventemitter3
{
    /**
     * @param {object} [options]
     * @param {number} [options.duration=1000] default duration if not set
     * @param {(string|function)} [options.ease=Penner.easeInOutSine] default ease function if not set (see {@link https://www.npmjs.com/package/penner} for names of easing functions)
     * @param {boolean} [options.useTicker=true] attach updates to a PIXI.Ticker
     * @param {PIXI.Ticker} [options.ticker=PIXI.ticker.shared || PIXI.Ticker.shared] which PIXI.Ticker to use
     * @fires Ease#complete
     * @fires Ease#each
     */
    constructor(options)
    {
        super();
        this.options = Object.assign({}, easeOptions, options);
        this.list = [];
        this.empty = true;
        if (this.options.useTicker === true)
        {
            // weird code to ensure pixi.js v4 support (which changed from PIXI.ticker.shared to PIXI.Ticker.shared)
            if (this.options.ticker)
            {
                this.ticker = this.options.ticker;
            }
            else
            {
                // to avoid Rollup transforming our import, save pixi namespace in a variable
                // from here: https://github.com/pixijs/pixi.js/issues/5757
                const pixiNS = PIXI;
                if (parseInt(/^(\d+)\./.exec(VERSION)[1]) < 5)
                {
                    this.ticker = pixiNS.ticker.shared;
                }
                else
                {
                    this.ticker = pixiNS.Ticker.shared;
                }
            }
            this.ticker.add(this.update, this);
        }
        this.key = `__ease_${Ease.id++}`;
    }

    /**
     * removes all eases and tickers
     */
    destroy()
    {
        this.removeAll();
        if (this.options.useTicker === true)
        {
            this.ticker.remove(this.update, this);
        }
    }

    /**
     * add animation(s) to a PIXI.DisplayObject element
     * @param {(PIXI.DisplayObject|PIXI.DisplayObject[])} element
     * @param {object} params
     * @param {number} [params.x]
     * @param {number} [params.y]
     * @param {(PIXI.DisplayObject|PIXI.Point)} [params.target] changes both x and y
     * @param {number} [params.width]
     * @param {number} [params.height]
     * @param {number} [params.scale] changes both scale.x and scale.y
     * @param {number} [params.scaleX]
     * @param {number} [params.scaleY]
     * @param {number} [params.alpha]
     * @param {number} [params.rotation]
     * @param {number} [params.rotationFace] rotate to face a DisplayObject using the closest angle
     * @param {number} [params.skew] changes both skew.x and skew.y
     * @param {number} [params.skewX]
     * @param {number} [params.skewY]
     * @param {(number|number[])} [params.tint] this includes the current tint (or 0xffffff) as the first color
     * @param {(number|number[])} [params.tintBlend] tint by blending between colors
     * @param {number} [params.shake] moves
     * @param {number} [params.*] generic number parameter
     * @param {object} [options]
     * @param {number} [options.duration]
     * @param {(string|function)} [options.ease]
     * @param {(boolean|number)} [options.repeat]
     * @param {boolean} [options.reverse]
     * @param {number} [options.wait] wait this number of milliseconds before ease starts
     * @returns {EaseDisplayObject}
     */
    add(element, params, options)
    {
        if (Array.isArray(element))
        {
            for (let i = 0; i < element.length; i++)
            {
                if (i === element.length - 1)
                {
                    return this.add(element[i], params, options)
                }
                else
                {
                    this.add(element[i], params, options);
                }
            }
        }

        options = options || {};
        options.duration = typeof options.duration !== 'undefined' ? options.duration : this.options.duration;
        options.ease = options.ease || this.options.ease;

        if (typeof options.ease === 'string')
        {
            options.ease = penner[options.ease];
        }
        let ease = element[this.key];
        if (ease)
        {
            if (!ease.connected)
            {
                this.list.push(element);
            }
        }
        else
        {
            ease = element[this.key] = new EaseDisplayObject(element);
            this.list.push(ease);
        }
        ease.add(params, options);
        this.empty = false;
        return ease
    }

    /**
     * remove all eases from a DisplayObject
     * @param {PIXI.DisplayObject} object
     */
    removeAllEases(object)
    {
        if (object[this.key])
        {
            const index = this.list.indexOf(object[this.key]);
            if (index !== -1)
            {
                this.list.splice(index, 1);
            }
            delete object[this.key];
        }
    }

    /**
     * removes one or more eases from a DisplayObject
     * @param {PIXI.DisplayObject} object
     * @param {(string|string[])} param
     */
    removeEase(object, param)
    {
        const ease = object[this.key];
        if (ease)
        {
            if (Array.isArray(param))
            {
                param.forEach((entry) => ease.remove(entry));
            }
            else
            {
                ease.remove(param);
            }
        }
    }

    /**
     * remove all animations for all DisplayObjects
     */
    removeAll()
    {
        while (this.list.length)
        {
            const easeDisplayObject = this.list.pop();
            if (easeDisplayObject.element[this.key])
            {
                delete easeDisplayObject.element[this.key];
            }
        }
    }

    /**
     * update frame; this is called automatically if options.useTicker !== false
     * @param {number} elapsed time in ms
     */
    update()
    {
        if (!this.empty)
        {
            const elapsed = Math.max(this.ticker.elapsedMS, 1000 / 60);
            for (let i = 0, _i = this.list.length; i < _i; i++)
            {
                if (this.list[i].update(elapsed))
                {
                    this.list.splice(i, 1);
                    i--;
                    _i--;
                }
            }
            this.emit('each', this);
            if (this.list.length === 0)
            {
                this.empty = true;
                this.emit('complete', this);
            }
        }
    }

    /**
     * number of elements being eased
     * @returns {number}
     */
    countElements()
    {
        return this.list.length
    }

    /**
     * number of active animations across all elements
     * @returns {number}
     */
    countRunning()
    {
        let count = 0;
        for (let entry of this.list)
        {
            count += entry.count;
        }
        return count
    }

    /**
     * default duration for eases.add() (only applies to newly added eases)
     * @type {number}
     */
    set duration(duration)
    {
        this.options.duration = duration;
    }
    get duration()
    {
        return this.options.duration
    }

    /**
     * default ease for eases.add() (only applies to newly added eases)
     * @type {(string|Function)}
     */
    set ease(ease)
    {
        this.options.ease = ease;
    }
    get ease()
    {
        return this.options.ease
    }
}

// manages the ids used to define the DisplayObject ease variable (enabled multiple eases attached to the same object)
Ease.id = 0;

/**
 * default instantiated Ease class
 * @type {Ease}
 */
let ease = new Ease();

Ease.ease = ease;

class List
{
    constructor()
    {
        console.warn('Ease.List was deprecated. Use new Ease() instead.');
    }
}

/**
 * fires when there are no more eases
 * @event Ease#complete
 * @type {Ease}
 */

 /**
 * fires on each loop when there are eases running
 * @event Ease#each
 * @type {Ease}
 */

export { Ease, List, ease };
//# sourceMappingURL=ease.es.js.map
