(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

var angle = function (_wait) {
    _inherits(angle, _wait);

    /**
     * animate object's {x, y} using an angle
     * @param {object} object to animate
     * @param {number} angle in radians
     * @param {number} speed in pixels/millisecond
     * @param {number} [duration=0] in milliseconds; if 0, then continues forever
     * @param {object} [options] @see {@link Wait}
     * @private
     */
    function angle(object, _angle, speed, duration, options) {
        _classCallCheck(this, angle);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (angle.__proto__ || Object.getPrototypeOf(angle)).call(this, object, options));

        _this.type = 'Angle';
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.angle = _angle;
            _this.speed = speed;
            _this.duration = duration || 0;
        }
        return _this;
    }

    _createClass(angle, [{
        key: 'save',
        value: function save() {
            var save = _get(angle.prototype.__proto__ || Object.getPrototypeOf(angle.prototype), 'save', this).call(this);
            save.angle = this.angle;
            save.speed = this.speed;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(angle.prototype.__proto__ || Object.getPrototypeOf(angle.prototype), 'load', this).call(this, _load);
            this.angle = _load.angle;
            this.speed = _load.speed;
        }
    }, {
        key: 'calculate',
        value: function calculate(elapsed) {
            this.object.x += this.cos * elapsed * this.speed;
            this.object.y += this.sin * elapsed * this.speed;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            this.angle += Math.PI;
        }
    }, {
        key: 'angle',
        get: function get() {
            return this._angle;
        },
        set: function set(value) {
            this._angle = value;
            this.sin = Math.sin(this._angle);
            this.cos = Math.cos(this._angle);
        }
    }]);

    return angle;
}(wait);

module.exports = angle;

},{"./wait":11}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Angle = require('yy-angle');
var wait = require('./wait');

/** Rotates an object to face the target */

var face = function (_wait) {
    _inherits(face, _wait);

    /**
     * @param {object} object
     * @param {Point} target
     * @param {number} speed in radians/millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't stop animation when complete
     */
    function face(object, target, speed, options) {
        _classCallCheck(this, face);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (face.__proto__ || Object.getPrototypeOf(face)).call(this, object, options));

        _this.type = 'Face';
        _this.target = target;
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.speed = speed;
        }
        return _this;
    }

    _createClass(face, [{
        key: 'save',
        value: function save() {
            if (this.options.cancel) {
                return null;
            }
            var save = _get(face.prototype.__proto__ || Object.getPrototypeOf(face.prototype), 'save', this).call(this);
            save.speed = this.speed;
            save.keepAlive = this.options.keepAlive;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(face.prototype.__proto__ || Object.getPrototypeOf(face.prototype), 'load', this).call(this, _load);
            this.speed = _load.speed;
            this.options.keepAlive = _load.keepAlive;
        }
    }, {
        key: 'calculate',
        value: function calculate(elapsed) {
            var angle = Angle.angleTwoPoints(this.object.position, this.target);
            var difference = Angle.differenceAngles(angle, this.object.rotation);
            if (difference === 0) {
                this.emit('done', this.object);
                if (!this.options.keepAlive) {
                    return true;
                }
            } else {
                var sign = Angle.differenceAnglesSign(angle, this.object.rotation);
                var change = this.speed * elapsed;
                var delta = change > difference ? difference : change;
                this.object.rotation += delta * sign;
            }
        }
    }]);

    return face;
}(wait);

module.exports = face;

},{"./wait":11,"yy-angle":22}],3:[function(require,module,exports){
'use strict';

var Ease = {
    list: require('./list'),
    wait: require('./wait'),
    to: require('./to'),
    shake: require('./shake'),
    tint: require('./tint'),
    face: require('./face'),
    angle: require('./angle'),
    target: require('./target'),
    movie: require('./movie'),
    load: require('./load')
};

PIXI.extras.Ease = Ease;

module.exports = Ease;

},{"./angle":1,"./face":2,"./list":4,"./load":5,"./movie":6,"./shake":7,"./target":8,"./tint":9,"./to":10,"./wait":11}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = require('eventemitter3');

var Angle = require('./angle');
var Face = require('./face');
var Load = require('./load');
var Movie = require('./movie');
var Shake = require('./shake');
var Target = require('./target');
var Tint = require('./tint');
var To = require('./to');
var Wait = require('./wait');

var Ease = function (_Events) {
    _inherits(Ease, _Events);

    /**
     * Main class for creating eases
     * @param {object} [options]
     * @param {boolean} [options.noTicker] don't add the update function to PIXI.ticker
     * @param {PIXI.ticker} [options.ticker=PIXI.ticker.shared] use this PIXI.ticker for the list
     * @extends eventemitter
     * @fire done
     * @fire each
     */
    function Ease(options) {
        _classCallCheck(this, Ease);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (Ease.__proto__ || Object.getPrototypeOf(Ease)).call(this));

        if (!options.noTicker) {
            var ticker = options.ticker || PIXI.ticker.shared;
            ticker.add(function () {
                return _this.update(ticker.deltaTime * 16.66);
            });
        }
        _this.list = [];
        _this.empty = true;
        _this.removeWaiting = [];
        _this.removeAllWaiting = false;
        return _this;
    }

    /**
     * Add animation(s) to animation list
     * @param {(object|object[])} any animation class
     * @return {object} first animation
     */


    _createClass(Ease, [{
        key: 'add',
        value: function add() {
            var first = void 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var arg = _step.value;

                    if (Array.isArray(arg)) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = arg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var entry = _step2.value;

                                if (!first) {
                                    first = entry;
                                }
                                this.list.push(entry);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    } else {
                        first = arg;
                        this.list.push(arg);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.empty = false;
            return first;
        }

        /**
         * remove animation(s)
         * @param {object|array} animate - the animation (or array of animations) to remove; can be null
         */

    }, {
        key: 'remove',
        value: function remove(animate) {
            if (this.inUpdate) {
                this.removeWaiting.push(animate);
            } else {
                if (Array.isArray(animate)) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = animate[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var each = _step3.value;

                            var index = this.list.indexOf(each);
                            if (index !== -1) {
                                this.list.splice(index, 1);
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                } else {
                    var _index = this.list.indexOf(animate);
                    if (_index !== -1) {
                        this.list.splice(_index, 1);
                    }
                }
            }
        }

        /**
         * remove all animations from list
         * @inherited from yy-loop
         */

    }, {
        key: 'removeAll',
        value: function removeAll() {
            if (this.inUpdate) {
                this.removeAllWaiting = true;
            } else {
                this.list = [];
            }
        }

        /**
         * update frame
         * this is automatically added to PIXI.ticker unless options.noTicker is set
         * if using options.noTicker, this should be called manually
         * @param {number} elasped time in MS since last update
         */

    }, {
        key: 'update',
        value: function update(elapsed) {
            this.inUpdate = true;
            for (var i = 0, _i = this.list.length; i < _i; i++) {
                if (this.list[i] && this.list[i].update(elapsed)) {
                    this.list.splice(i, 1);
                    i--;
                    _i--;
                }
            }
            this.emit('each', this);
            if (this.list.length === 0 && !this.empty) {
                this.emit('done', this);
                this.empty = true;
            }
            this.inUpdate = false;
            if (this.removeAllWaiting) {
                this.removeAll();
                this.removeAllWaiting = false;
            }
            while (this.removeWaiting.length) {
                this.remove(this.removeWaiting.pop());
            }
        }

        /**
         * number of animations
         * @type {number}
         */

    }, {
        key: 'to',


        /**
         * default options for all eases
         * @typedef {object} EaseOptions
         * @param {object} [EaseOptions.options]
         * @param {number} [EaseOptions.options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
         * @param {boolean} [EaseOptions.options.pause] start the animation paused
         * @param {boolean|number} [EaseOptions.options.repeat] true: repeat animation forever n: repeat animation n times
         * @param {boolean|number} [EaseOptions.options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
         * @param {Function} [EaseOptions.options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
         * @param {string|Function} [EaseOptions.options.ease] name or function from easing.js (see http://easings.net for examples)
         */

        /**
         * ease parameters of object
         * @param {PIXI.DisplayObject} object to animate
         * @param {object} goto - parameters to animate, e.g.: {alpha: 5, scale: {3, 5}, scale: 5, rotation: Math.PI}
         * @param {number} duration - time to run
         * @fires done
         * @fires wait
         * @fires first
         * @fires each
         * @fires loop
         * @fires reverse
         */
        value: function to() {
            return this.add(new (Function.prototype.bind.apply(To, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /**
         * animate object's {x, y} using an angle
         * @param {object} object to animate
         * @param {number} angle in radians
         * @param {number} speed in pixels/millisecond
         * @param {number} [duration=0] in milliseconds; if 0, then continues forever
         * @param {object} [options] @see {@link Wait}
         */

    }, {
        key: 'angle',
        value: function angle() {
            return this.add(new (Function.prototype.bind.apply(Angle, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.face class; see Ease.to class below for parameters */

    }, {
        key: 'face',
        value: function face() {
            return this.add(new (Function.prototype.bind.apply(Face, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.load class; see Ease.to class below for parameters */

    }, {
        key: 'load',
        value: function load() {
            return this.add(new (Function.prototype.bind.apply(Load, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.movie class; see Ease.to class below for parameters */

    }, {
        key: 'movie',
        value: function movie() {
            return this.add(new (Function.prototype.bind.apply(Movie, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.shake class; see Ease.to class below for parameters */

    }, {
        key: 'shake',
        value: function shake() {
            return this.add(new (Function.prototype.bind.apply(Shake, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.target class; see Ease.to class below for parameters */

    }, {
        key: 'target',
        value: function target() {
            return this.add(new (Function.prototype.bind.apply(Target, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.angle tint; see Ease.to class below for parameters */

    }, {
        key: 'tint',
        value: function tint() {
            return this.add(new (Function.prototype.bind.apply(Tint, [null].concat(Array.prototype.slice.call(arguments))))());
        }

        /** helper to add to the list a new Ease.wait class; see Ease.to class below for parameters */

    }, {
        key: 'wait',
        value: function wait() {
            return this.add(new (Function.prototype.bind.apply(Wait, [null].concat(Array.prototype.slice.call(arguments))))());
        }
    }, {
        key: 'count',
        get: function get() {
            return this.list.length;
        }

        /**
         * number of active animations
         * @type {number}
         */

    }, {
        key: 'countRunning',
        get: function get() {
            var count = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var entry = _step4.value;

                    if (!entry.pause) {
                        count++;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return count;
        }
    }]);

    return Ease;
}(Events);

module.exports = Ease;

},{"./angle":1,"./face":2,"./load":5,"./movie":6,"./shake":7,"./target":8,"./tint":9,"./to":10,"./wait":11,"eventemitter3":12}],5:[function(require,module,exports){
'use strict';

var wait = require('./wait');
var to = require('./to');
var tint = require('./tint');
var shake = require('./shake');
var angle = require('./angle');
var face = require('./face');
var target = require('./target');
var movie = require('./movie');

/**
 * restart an animation = requires a saved state
 * @param {object} object(s) to animate
 */
function load(object, load) {
    if (!load) {
        return null;
    }
    var options = { load: load };
    switch (load.type) {
        case 'Wait':
            return new wait(object, options);
        case 'To':
            return new to(object, null, null, options);
        case 'Tint':
            return new tint(object, null, null, options);
        case 'Shake':
            return new shake(object, null, null, options);
        case 'Angle':
            return new angle(object, null, null, null, options);
        case 'Face':
            return new face(object[0], object[1], null, options);
        case 'Target':
            return new target(object[0], object[1], null, options);
        case 'Movie':
            return new movie(object, object[1], null, options);
    }
}

module.exports = load;

},{"./angle":1,"./face":2,"./movie":6,"./shake":7,"./target":8,"./tint":9,"./to":10,"./wait":11}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

/**
 * animate a movie of textures
 */

var movie = function (_wait) {
    _inherits(movie, _wait);

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
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    function movie(object, textures, duration, options) {
        _classCallCheck(this, movie);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (movie.__proto__ || Object.getPrototypeOf(movie)).call(this, object, options));

        _this.type = 'Movie';
        if (Array.isArray(object)) {
            _this.list = object;
            _this.object = _this.list[0];
        }
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.textures = textures;
            _this.duration = duration;
            _this.current = 0;
            _this.length = textures.length;
            _this.interval = duration / _this.length;
            _this.isReverse = false;
            _this.restart();
        }
        return _this;
    }

    _createClass(movie, [{
        key: 'save',
        value: function save() {
            var save = _get(movie.prototype.__proto__ || Object.getPrototypeOf(movie.prototype), 'save', this).call(this);
            save.goto = this.goto;
            save.current = this.current;
            save.length = this.length;
            save.interval = this.interval;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(movie.prototype.__proto__ || Object.getPrototypeOf(movie.prototype), 'load', this).call(this, _load);
            this.goto = _load.goto;
            this.current = _load.current;
            this.interval = _load.current;
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.current = 0;
            this.time = 0;
            this.isReverse = false;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            this.isReverse = !this.isReverse;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var index = Math.round(this.options.ease(this.time, 0, this.length - 1, this.duration));
            if (this.isReverse) {
                index = this.length - 1 - index;
            }
            if (this.list) {
                for (var i = 0; i < this.list.length; i++) {
                    this.list[i].texture = this.textures[index];
                }
            } else {
                this.object.texture = this.textures[index];
            }
        }
    }]);

    return movie;
}(wait);

module.exports = movie;

},{"./wait":11}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

/**
 * shakes an object or list of objects
 */

var shake = function (_wait) {
    _inherits(shake, _wait);

    /**
     * @param {object|array} object or list of objects to shake
     * @param {number} amount to shake
     * @param {number} duration (in milliseconds) to shake
     * @param {object} options (see Animate.wait)
     */
    function shake(object, amount, duration, options) {
        _classCallCheck(this, shake);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (shake.__proto__ || Object.getPrototypeOf(shake)).call(this, object, options));

        _this.type = 'Shake';
        if (Array.isArray(object)) {
            _this.array = true;
            _this.list = object;
        }
        if (options.load) {
            _this.load(options.load);
        } else {
            if (_this.list) {
                _this.start = [];
                for (var i = 0; i < object.length; i++) {
                    var target = object[i];
                    _this.start[i] = { x: target.x, y: target.y };
                }
            } else {
                _this.start = { x: object.x, y: object.y };
            }
            _this.amount = amount;
            _this.duration = duration;
        }
        return _this;
    }

    _createClass(shake, [{
        key: 'save',
        value: function save() {
            var save = _get(shake.prototype.__proto__ || Object.getPrototypeOf(shake.prototype), 'save', this).call(this);
            save.start = this.start;
            save.amount = this.amount;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(shake.prototype.__proto__ || Object.getPrototypeOf(shake.prototype), 'load', this).call(this, _load);
            this.start = _load.start;
            this.amount = _load.amount;
        }
    }, {
        key: 'calculate',
        value: function calculate() /*elapsed*/{
            var object = this.object;
            var start = this.start;
            var amount = this.amount;
            if (this.array) {
                var list = this.list;
                for (var i = 0; i < list.length; i++) {
                    var _object = list[i];
                    var actual = start[i];
                    _object.x = actual.x + Math.floor(Math.random() * amount * 2) - amount;
                    _object.y = actual.y + Math.floor(Math.random() * amount * 2) - amount;
                }
            }
            object.x = start.x + Math.floor(Math.random() * amount * 2) - amount;
            object.y = start.y + Math.floor(Math.random() * amount * 2) - amount;
        }
    }, {
        key: 'done',
        value: function done() {
            var object = this.object;
            var start = this.start;
            if (this.array) {
                var list = this.list;
                for (var i = 0; i < list.length; i++) {
                    var _object2 = list[i];
                    var actual = start[i];
                    _object2.x = actual.x;
                    _object2.y = actual.y;
                }
            } else {
                object.x = start.x;
                object.y = start.y;
            }
        }
    }]);

    return shake;
}(wait);

module.exports = shake;

},{"./wait":11}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

/** move an object to a target's location */

var target = function (_wait) {
    _inherits(target, _wait);

    /**
     * move to a target
     * @param {object} object - object to animate
     * @param {object} target - object needs to contain {x: x, y: y}
     * @param {number} speed - number of pixels to move per millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't cancel the animation when target is reached
     */
    function target(object, _target, speed, options) {
        _classCallCheck(this, target);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (target.__proto__ || Object.getPrototypeOf(target)).call(this, object, options));

        _this.type = 'Target';
        _this.target = _target;
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.speed = speed;
        }
        return _this;
    }

    _createClass(target, [{
        key: 'save',
        value: function save() {
            var save = _get(target.prototype.__proto__ || Object.getPrototypeOf(target.prototype), 'save', this).call(this);
            save.speed = this.speed;
            save.keepAlive = this.options.keepAlive;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(target.prototype.__proto__ || Object.getPrototypeOf(target.prototype), 'load', this).call(this, _load);
            this.speed = _load.speed;
            this.options.keepAlive = _load.keepAlive;
        }
    }, {
        key: 'calculate',
        value: function calculate(elapsed) {
            var deltaX = this.target.x - this.object.x;
            var deltaY = this.target.y - this.object.y;
            if (deltaX === 0 && deltaY === 0) {
                this.emit('done', this.object);
                if (!this.options.keepAlive) {
                    return true;
                }
            } else {
                var angle = Math.atan2(deltaY, deltaX);
                this.object.x += Math.cos(angle) * elapsed * this.speed;
                this.object.y += Math.sin(angle) * elapsed * this.speed;
                if (deltaX >= 0 !== this.target.x - this.object.x >= 0) {
                    this.object.x = this.target.x;
                }
                if (deltaY >= 0 !== this.target.y - this.object.y >= 0) {
                    this.object.y = this.target.y;
                }
            }
        }
    }]);

    return target;
}(wait);

module.exports = target;

},{"./wait":11}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Color = require('yy-color');
var wait = require('./wait');

var tint = function (_wait) {
    _inherits(tint, _wait);

    /**
     * @param {PIXI.DisplayObject|PIXI.DisplayObject[]} object
     * @param {number|number[]} tint
     * @param {number} [duration] in milliseconds
     * @param {object} [options] @see {@link Wait}
     */
    function tint(object, _tint, duration, options) {
        _classCallCheck(this, tint);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (tint.__proto__ || Object.getPrototypeOf(tint)).call(this, object, options));

        _this.type = 'Tint';
        if (Array.isArray(object)) {
            _this.list = object;
            _this.object = _this.list[0];
        }
        _this.duration = duration;
        if (options.load) {
            _this.load(options.load);
        } else if (Array.isArray(_tint)) {
            _this.tints = [_this.object.tint].concat(_toConsumableArray(_tint));
        } else {
            _this.start = _this.object.tint;
            _this.to = _tint;
        }
        return _this;
    }

    _createClass(tint, [{
        key: 'save',
        value: function save() {
            var save = _get(tint.prototype.__proto__ || Object.getPrototypeOf(tint.prototype), 'save', this).call(this);
            save.start = this.start;
            save.to = this.to;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(tint.prototype.__proto__ || Object.getPrototypeOf(tint.prototype), 'load', this).call(this, _load);
            this.start = _load.start;
            this.to = _load.to;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var percent = this.options.ease(this.time, 0, 1, this.duration);
            if (this.tints) {
                var each = 1 / (this.tints.length - 1);
                var per = each;
                for (var i = 1; i < this.tints.length; i++) {
                    if (percent <= per) {
                        var color = Color.blend(1 - (per - percent) / each, this.tints[i - 1], this.tints[i]);
                        if (this.list) {
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var object = _step.value;

                                    object.tint = color;
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        } else {
                            this.object.tint = color;
                        }
                        break;
                    }
                    per += each;
                }
            } else {
                var _color = Color.blend(percent, this.start, this.to);
                if (this.list) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _object = _step2.value;

                            _object.tint = _color;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                } else {
                    this.object.tint = _color;
                }
            }
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            if (this.tints) {
                var tints = [];
                for (var i = this.tints.length - 1; i >= 0; i--) {
                    tints.push(this.tints[i]);
                }
                this.tints = tints;
            } else {
                var swap = this.to;
                this.to = this.start;
                this.start = swap;
            }
        }
    }]);

    return tint;
}(wait);

module.exports = tint;

},{"./wait":11,"yy-color":23}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

/** animate any numeric parameter of an object or array of objects */

var to = function (_wait) {
    _inherits(to, _wait);

    /**
     * @private
     * @param {object} object to animate
     * @param {object} goto - parameters to animate, e.g.: {alpha: 5, scale: {3, 5}, scale: 5, rotation: Math.PI}
     * @param {number} duration - time to run
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {boolean|number} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {boolean|number} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {string|Function} [options.ease] name or function from easing.js (see http://easings.net for examples)
     * @emits to:done animation expires
     * @emits to:wait each update during a wait
     * @emits to:first first update when animation starts
     * @emits to:each each update while animation is running
     * @emits to:loop when animation is repeated
     * @emits to:reverse when animation is reversed
     */
    function to(object, goto, duration, options) {
        _classCallCheck(this, to);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (to.__proto__ || Object.getPrototypeOf(to)).call(this, object, options));

        _this.type = 'To';
        if (Array.isArray(object)) {
            _this.list = object;
            _this.object = _this.list[0];
        }
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.goto = goto;
            _this.fixScale();
            _this.duration = duration;
            _this.restart();
        }
        return _this;
    }

    /**
     * converts scale from { scale: n } to { scale: { x: n, y: n }}
     * @private
     */


    _createClass(to, [{
        key: 'fixScale',
        value: function fixScale() {
            if (typeof this.goto['scale'] !== 'undefined' && !Number.isNaN(this.goto['scale'])) {
                this.goto['scale'] = { x: this.goto['scale'], y: this.goto['scale'] };
            }
        }
    }, {
        key: 'save',
        value: function save() {
            var save = _get(to.prototype.__proto__ || Object.getPrototypeOf(to.prototype), 'save', this).call(this);
            save.goto = this.goto;
            save.start = this.start;
            save.delta = this.delta;
            save.keys = this.keys;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(to.prototype.__proto__ || Object.getPrototypeOf(to.prototype), 'load', this).call(this, _load);
            this.goto = _load.goto;
            this.start = _load.start;
            this.delta = _load.delta;
            this.keys = _load.keys;
        }
    }, {
        key: 'restart',
        value: function restart() {
            var i = 0;
            var start = this.start = [];
            var delta = this.delta = [];
            var keys = this.keys = [];
            var goto = this.goto;
            var object = this.object;

            // loops through all keys in goto object
            for (var key in goto) {

                // handles keys with one additional level e.g.: goto = {scale: {x: 5, y: 3}}
                if (isNaN(goto[key])) {
                    keys[i] = { key: key, children: [] };
                    start[i] = [];
                    delta[i] = [];
                    var j = 0;
                    for (var key2 in goto[key]) {
                        keys[i].children[j] = key2;
                        start[i][j] = parseFloat(object[key][key2]);
                        start[i][j] = this._correctDOM(key2, start[i][j]);
                        start[i][j] = isNaN(this.start[i][j]) ? 0 : start[i][j];
                        delta[i][j] = goto[key][key2] - start[i][j];
                        j++;
                    }
                } else {
                    start[i] = parseFloat(object[key]);
                    start[i] = this._correctDOM(key, start[i]);
                    start[i] = isNaN(this.start[i]) ? 0 : start[i];
                    delta[i] = goto[key] - start[i];
                    keys[i] = key;
                }
                i++;
            }
            this.time = 0;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            var object = this.object;
            var keys = this.keys;
            var goto = this.goto;
            var delta = this.delta;
            var start = this.start;

            for (var i = 0, _i = keys.length; i < _i; i++) {
                var key = keys[i];
                if (isNaN(goto[key])) {
                    for (var j = 0, _j = key.children.length; j < _j; j++) {
                        delta[i][j] = -delta[i][j];
                        start[i][j] = parseFloat(object[key.key][key.children[j]]);
                        start[i][j] = isNaN(start[i][j]) ? 0 : start[i][j];
                    }
                } else {
                    delta[i] = -delta[i];
                    start[i] = parseFloat(object[key]);
                    start[i] = isNaN(start[i]) ? 0 : start[i];
                }
            }
        }
    }, {
        key: 'calculate',
        value: function calculate() /*elapsed*/{
            var object = this.object;
            var list = this.list;
            var keys = this.keys;
            var goto = this.goto;
            var time = this.time;
            var start = this.start;
            var delta = this.delta;
            var duration = this.duration;
            var ease = this.options.ease;
            for (var i = 0, _i = this.keys.length; i < _i; i++) {
                var key = keys[i];
                if (isNaN(goto[key])) {
                    var key1 = key.key;
                    for (var j = 0, _j = key.children.length; j < _j; j++) {
                        var key2 = key.children[j];
                        var others = object[key1][key2] = time >= duration ? start[i][j] + delta[i][j] : ease(time, start[i][j], delta[i][j], duration);
                        if (list) {
                            for (var k = 1, _k = list.length; k < _k; k++) {
                                list[k][key1][key2] = others;
                            }
                        }
                    }
                } else {
                    var _key = keys[i];
                    var _others = object[_key] = time >= duration ? start[i] + delta[i] : ease(time, start[i], delta[i], duration);
                    if (list) {
                        for (var _j2 = 1, _j3 = this.list.length; _j2 < _j3; _j2++) {
                            list[_j2][_key] = _others;
                        }
                    }
                }
            }
        }
    }]);

    return to;
}(wait);

module.exports = to;

},{"./wait":11}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Easing = require('penner');
var EventEmitter = require('eventemitter3');

var wait = function (_EventEmitter) {
    _inherits(wait, _EventEmitter);

    /**
     * @param {object|object[]} object or list of objects to animate
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {(boolean|number)} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {(boolean|number)} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     *
     * @param {number} [options.id] user-generated id (e.g., I use it to properly load animations when an object has multiple animations running)
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {Function|string} [options.ease] function (or penner function name) from easing.js (see http://easings.net for examples)*
     *
     * @emits {done} animation expires
     * @emits {wait} each update during a wait
     * @emits {first} first update when animation starts
     * @emits {each} each update while animation is running
     * @emits {loop} when animation is repeated
     * @emits {reverse} when animation is reversed
     */
    function wait(object, options) {
        _classCallCheck(this, wait);

        var _this = _possibleConstructorReturn(this, (wait.__proto__ || Object.getPrototypeOf(wait)).call(this));

        _this.object = object;
        _this.options = options || {};
        _this.type = 'Wait';
        if (_this.options.load) {
            _this.load(_this.options.load);
        } else {
            _this.time = 0;
        }
        if (_this.options.ease && typeof _this.options.ease !== 'function') {
            _this.options.easeName = _this.options.ease;
            _this.options.ease = Easing[_this.options.ease];
        }
        if (!_this.options.ease) {
            _this.options.ease = Easing['linear'];
        }
        return _this;
    }

    _createClass(wait, [{
        key: 'save',
        value: function save() {
            var save = { type: this.type, time: this.time, duration: this.duration, ease: this.options.easeName };
            var options = this.options;
            if (options.wait) {
                save.wait = options.wait;
            }
            if (typeof options.id !== 'undefined') {
                save.id = options.id;
            }
            if (options.pause) {
                save.pause = options.pause;
            }
            if (options.repeat) {
                save.repeat = options.repeat;
            }
            if (options.reverse) {
                save.reverse = options.reverse;
            }
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            this.options.wait = _load.wait;
            this.options.pause = _load.pause;
            this.options.repeat = _load.repeat;
            this.options.reverse = _load.reverse;
            this.options.id = _load.id;
            this.options.ease = _load.ease;
            if (this.options.ease && typeof this.options.ease !== 'function') {
                this.options.easeName = this.options.ease;
                this.options.ease = Easing[this.options.ease];
            }
            if (!this.options.ease) {
                this.options.ease = Easing['linear'];
            }
            this.time = _load.time;
            this.duration = _load.duration;
        }

        /**
         * pause this entry
         * @type {boolean}
         */

    }, {
        key: 'end',
        value: function end(leftOver) {
            if (this.options.reverse) {
                this.reverse();
                this.time = leftOver;
                if (!this.options.repeat) {
                    if (this.options.reverse === true) {
                        this.options.reverse = false;
                    } else {
                        this.options.reverse--;
                    }
                } else {
                    if (this.options.repeat !== true) {
                        this.options.repeat--;
                    }
                }
                this.emit('loop', this.list || this.object);
            } else if (this.options.repeat) {
                this.time = leftOver;
                if (this.options.repeat !== true) {
                    this.options.repeat--;
                }
                this.emit('loop', this.list || this.object);
            } else {
                this.done();
                this.emit('done', this.list || this.object, leftOver);
                // this.list = this.object = null
                return true;
            }
        }
    }, {
        key: 'update',
        value: function update(elapsed) {
            var options = this.options;
            if (options.pause) {
                return;
            }
            if (options.wait) {
                options.wait -= elapsed;
                if (options.wait <= 0) {
                    elapsed = -options.wait;
                    options.wait = false;
                } else {
                    this.emit('wait', elapsed, this.list || this.object);
                    return;
                }
            }
            if (!this.first) {
                this.first = true;
                this.emit('first', this.list || this.object);
            }
            this.time += elapsed;
            var leftOver = 0;
            var duration = this.duration;
            var time = this.time;
            if (duration !== 0 && time > duration) {
                leftOver = time - duration;
                this.time = time = duration;
            }
            var force = this.calculate(elapsed);
            this.emit('each', elapsed, this.list || this.object, this);
            if (this.type === 'Wait' || duration !== 0 && time === duration) {
                return this.end(leftOver);
            }
            return force || time === duration;
        }

        // correct certain DOM values

    }, {
        key: '_correctDOM',
        value: function _correctDOM(key, value) {
            switch (key) {
                case 'opacity':
                    return isNaN(value) ? 1 : value;
            }
            return value;
        }
    }, {
        key: 'reverse',
        value: function reverse() {}
    }, {
        key: 'calculate',
        value: function calculate() {}
    }, {
        key: 'done',
        value: function done() {}
    }, {
        key: 'pause',
        set: function set(value) {
            this.options.pause = value;
        },
        get: function get() {
            return this.options.pause;
        }
    }]);

    return wait;
}(EventEmitter);

module.exports = wait;

},{"eventemitter3":12,"penner":13}],12:[function(require,module,exports){
'use strict';

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
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}],13:[function(require,module,exports){

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
    if (typeof exports === 'object') {
      return module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else {
      return this.penner = factory;
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
      if (t === 0) {
        b;
      }
      if (t === d) {
        b + c;
      }
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
      if (t === 0) {
        b;
      } else if ((t /= d) === 1) {
        b + c;
      }
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
      if (t === 0) {
        b;
      } else if ((t /= d) === 1) {
        b + c;
      }
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
      if (t === 0) {
        b;
      } else if ((t /= d / 2) === 2) {
        b + c;
      }
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

}).call(this);

},{}],14:[function(require,module,exports){
// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = require('./lib/alea');

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./lib/xor128');

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./lib/xorwow');

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./lib/xorshift7');

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./lib/xor4096');

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = require('./lib/tychei');

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = require('./seedrandom');

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;

},{"./lib/alea":15,"./lib/tychei":16,"./lib/xor128":17,"./lib/xor4096":18,"./lib/xorshift7":19,"./lib/xorwow":20,"./seedrandom":21}],15:[function(require,module,exports){
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],16:[function(require,module,exports){
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],17:[function(require,module,exports){
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],18:[function(require,module,exports){
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);

},{}],19:[function(require,module,exports){
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


},{}],20:[function(require,module,exports){
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],21:[function(require,module,exports){
/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

},{"crypto":25}],22:[function(require,module,exports){
// angle.js <https://github.com/davidfig/anglejs>
// Released under MIT license <https://github.com/davidfig/angle/blob/master/LICENSE>
// Author: David Figatner
// Copyright (c) 2016-17 YOPEY YOPEY LLC

var _toDegreeConversion = 180 / Math.PI
var _toRadianConversion = Math.PI / 180

/** @constant {number} */
var UP = Math.PI / 2
var DOWN = 3 * Math.PI / 2
var LEFT = Math.PI
var RIGHT = 0

var NORTH = UP
var SOUTH = DOWN
var WEST = LEFT
var EAST = RIGHT

var PI_2 = Math.PI * 2
var PI_QUARTER = Math.PI / 4
var PI_HALF = Math.PI / 2

/**
 * converts from radians to degrees (all other functions expect radians)
 * @param {number} radians
 * @return {number} degrees
 */
function toDegrees(radians)
{
    return radians * _toDegreeConversion
}

/**
 * converts from degrees to radians (all other functions expect radians)
 * @param {number} degrees
 * @return {number} radians
 */
function toRadians(degrees)
{
    return degrees * _toRadianConversion
}

/**
 * returns whether the target angle is between angle1 and angle2 (in radians)
 * (based on: http://stackoverflow.com/questions/11406189/determine-if-angle-lies-between-2-other-angles)
 * @param {number} target angle
 * @param {number} angle1
 * @param {number} angle2
 * @return {boolean}
 */
function isAngleBetween(target, angle1, angle2)
{
    var rAngle = ((angle2 - angle1) % PI_2 + PI_2) % PI_2
    if (rAngle >= Math.PI)
    {
        var swap = angle1
        angle1 = angle2
        angle2 = swap
    }

    if (angle1 <= angle2)
    {
        return target >= angle1 && target <= angle2
    }
    else
    {
        return target >= angle1 || target <= angle2
    }
}

/**
 * returns +1 or -1 based on whether the difference between two angles is positive or negative (in radians)
 * @param {number} target angle
 * @param {number} source angle
 * @return {number} 1 or -1
 */
function differenceAnglesSign(target, source)
{
    function mod(a, n)
    {
        return (a % n + n) % n
    }

    var a = target - source
    return mod((a + Math.PI), PI_2) - Math.PI > 0 ? 1 : -1
}

/**
 * returns the normalized difference between two angles (in radians)
 * @param {number} a - first angle
 * @param {number} b - second angle
 * @return {number} normalized difference between a and b
 */
function differenceAngles(a, b)
{
    var c = Math.abs(a - b) % PI_2
    return c > Math.PI ? (PI_2 - c) : c
}

/**
 * returns a target angle that is the shortest way to rotate an object between start and to--may choose a negative angle
 * @param {number} start
 * @param {number} to
 * @return {number} shortest target angle
 */
function shortestAngle(start, to)
{
    var difference = differenceAngles(to, start)
    var sign = differenceAnglesSign(to, start)
    var delta = difference * sign
    return delta + start
}

/**
 * returns the normalized angle (0 - PI x 2)
 * @param {number} radians
 * @return {number} normalized angle in radians
 */
function normalize(radians)
{
    return radians - PI_2 * Math.floor(radians / PI_2)
}

/**
 * returns angle between two points (in radians)
 * @param {Point} [point1] {x: x, y: y}
 * @param {Point} [point2] {x: x, y: y}
 * @param {number} [x1]
 * @param {number} [y1]
 * @param {number} [x2]
 * @param {number} [y2]
 * @return {number} angle
 */
function angleTwoPoints(/* (point1, point2) OR (x1, y1, x2, y2) */)
{
    if (arguments.length === 4)
    {
        return Math.atan2(arguments[3] - arguments[1], arguments[2] - arguments[0])
    }
    else
    {
        return Math.atan2(arguments[1].y - arguments[0].y, arguments[1].x - arguments[0].x)
    }
}

/**
 * returns distance between two points
 * @param {Point} [point1] {x: x, y: y}
 * @param {Point} [point2] {x: x, y: y}
 * @param {number} [x1]
 * @param {number} [y1]
 * @param {number} [x2]
 * @param {number} [y2]
 * @return {number} distance
 */
function distanceTwoPoints(/* (point1, point2) OR (x1, y1, x2, y2) */)
{
    if (arguments.length === 2)
    {
        return Math.sqrt(Math.pow(arguments[1].x - arguments[0].x, 2) + Math.pow(arguments[1].y - arguments[0].y, 2))
    }
    else
    {
        return Math.sqrt(Math.pow(arguments[2] - arguments[0], 2) + Math.pow(arguments[3] - arguments[1], 2))
    }
}

/**
 * returns the squared distance between two points
 * @param {Point} [point1] {x: x, y: y}
 * @param {Point} [point2] {x: x, y: y}
 * @param {number} [x1]
 * @param {number} [y1]
 * @param {number} [x2]
 * @param {number} [y2]
 * @return {number} squared distance
 */
function distanceTwoPointsSquared(/* (point1, point2) OR (x1, y1, x2, y2) */)
{
    if (arguments.length === 2)
    {
        return Math.pow(arguments[1].x - arguments[0].x, 2) + Math.pow(arguments[1].y - arguments[0].y, 2)
    }
    else
    {
        return Math.pow(arguments[2] - arguments[0], 2) + Math.pow(arguments[3] - arguments[1], 2)
    }
}

/**
 * returns the closest cardinal (N, S, E, W) to the given angle (in radians)
 * @param {number} angle
 * @return {number} closest cardinal in radians
 */
function closestAngle(angle)
{
    var left = differenceAngles(angle, LEFT)
    var right = differenceAngles(angle, RIGHT)
    var up = differenceAngles(angle, UP)
    var down = differenceAngles(angle, DOWN)
    if (left <= right && left <= up && left <= down)
    {
        return LEFT
    }
    else if (right <= up && right <= down)
    {
        return RIGHT
    }
    else if (up <= down)
    {
        return UP
    }
    else
    {
        return DOWN
    }
}

/**
 * checks whether angles a1 and a2 are equal (after normalizing)
 * @param {number} a1
 * @param {number} a2
 * @param {number} [wiggle] return true if the difference between the angles is <= wiggle
 * @return {boolean} a1 === a2
 */
function equals(a1, a2, wiggle)
{
    if (wiggle)
    {
        return differenceAngles(a1, a2) < wiggle
    }
    else
    {
        return normalize(a1) === normalize(a2)
    }
}

/**
 * return a text representation of the cardinal direction
 * @param {number} angle
 * @returns {string} UP, DOWN, LEFT, RIGHT, or NOT CARDINAL
 */
function explain(angle)
{
    switch (angle)
    {
        case UP: return 'UP'
        case DOWN: return 'DOWN'
        case LEFT: return 'LEFT'
        case RIGHT: return 'RIGHT'
        default: return 'NOT CARDINAL'
    }
}

module.exports = {
    UP: UP,
    DOWN: DOWN,
    LEFT: LEFT,
    RIGHT: RIGHT,
    NORTH: NORTH,
    SOUTH: SOUTH,
    WEST: WEST,
    EAST: EAST,
    PI_2: PI_2,
    PI_QUARTER: PI_QUARTER,
    PI_HALF: PI_HALF,

    toDegrees: toDegrees,
    toRadians: toRadians,
    isAngleBetween: isAngleBetween,
    differenceAnglesSign: differenceAnglesSign,
    differenceAngles: differenceAngles,
    shortestAngle: shortestAngle,
    normalize: normalize,
    angleTwoPoints: angleTwoPoints,
    distanceTwoPoints: distanceTwoPoints,
    distanceTwoPointsSquared: distanceTwoPointsSquared,
    closestAngle: closestAngle,
    equals: equals,
    explain: explain
}
},{}],23:[function(require,module,exports){
// yy-color
// by David Figatner
// MIT License
// (c) YOPEY YOPEY LLC 2017
// https://github.com/davidfig/color

var Random = require('yy-random')

/**
 * converts a #FFFFFF to 0x123456
 * @param  {string} color
 * @return {string}
 */
function poundToHex(color)
{
    return '0x' + parseInt(color.substr(1)).toString(16)
}

/**
 * converts a 0x123456 to #FFFFFF
 * @param  {string} color
 * @return {string}
 */
function hexToPound(color)
{
    return '#' + color.substr(2)
}

/**
 * converts a number to #FFFFFF
 * @param  {number} color
 * @return {string}
 */
function valueToPound(color)
{
    return '#' + color.toString(16)
}

/**
 * based on tinycolor
 * https://github.com/bgrins/TinyColor
 * BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
 * @param {string} color
 * @returns {object}
 */
function hexToHsl (color)
{
    var rgb = this.hexToRgb(color),
        r = rgb.r,
        g = rgb.g,
        b = rgb.b
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    var h, s, l = (max + min) / 2

    if (max === min)
    {
        h = s = 0 // achromatic
    }
    else
    {
        var d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max)
        {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }

        h /= 6
    }

    return { h: h, s: s, l: l }
}

/** based on tinycolor
* https://github.com/bgrins/TinyColor
* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
* @param {object|number} color {h, s, b} or h
* @param {number} [s]
* @param {number} [l]
* @returns number
*/
function hslToHex(color)
{
    var r, g, b, h, s, l
    if (arguments.length === 1)
    {
        h = color.h,
        s = color.s,
        l = color.l
    }
    else
    {
        h = arguments[0]
        s = arguments[1]
        l = arguments[2]
    }

    function hue2rgb(p, q, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
    }

    if (s === 0)
    {
        r = g = b = l // achromatic
    }
    else
    {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s
        var p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
    }

    return this.rgbToHex(r * 255, g * 255, b * 255)
}

/* darkens a color by the percentage
* @param {object} color in hex (0xabcdef)
* @param {number} amount
* @return {number}
*/
function darken(color, amount)
{
    return this.blend(amount, color, 0)
}

/** based on tinycolor
* https://github.com/bgrins/TinyColor
* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
* @param {object} color
* @param {number} amount
*/
function saturate(color, amount)
{
    amount = (amount === 0) ? 0 : (amount || 10)
    var hsl = this.hexToHsl(color)
    hsl.s += amount / 100
    hsl.s = Math.min(1, Math.max(0, hsl.s))
    return this.hslToHex(hsl)
}

/** based on tinycolor
* https://github.com/bgrins/TinyColor
* BSD license: https://github.com/bgrins/TinyColor/blob/master/LICENSE
* @param {object} color
* @param {number} amount
*/
function desaturate(color, amount)
{
    amount = (amount === 0) ? 0 : (amount || 10)
    var hsl = this.hexToHsl(color)
    hsl.s -= amount / 100
    hsl.s = Math.min(1, Math.max(0, hsl.s))
    return this.hslToHex(hsl)
}

/**
 * blends two colors together
 * @param  {number} percent [0.0 - 1.0]
 * @param  {string} color1 first color in 0x123456 format
 * @param  {string} color2 second color in 0x123456 format
 * @return {number}
 */
function blend(percent, color1, color2)
{
    if (percent === 0)
    {
        return color1
    }
    if (percent === 1)
    {
        return color2
    }
    var r1 = color1 >> 16
    var g1 = color1 >> 8 & 0x0000ff
    var b1 = color1 & 0x0000ff
    var r2 = color2 >> 16
    var g2 = color2 >> 8 & 0x0000ff
    var b2 = color2 & 0x0000ff
    var percent1 = 1 - percent
    var r = percent1 * r1 + percent * r2
    var g = percent1 * g1 + percent * g2
    var b = percent1 * b1 + percent * b2
    return r << 16 | g << 8 | b
}

/**
 * returns a hex color into an rgb value
 * @param  {number} hex
 * @return {string}
 */
function hexToRgb(hex)
{
    if (hex === 0)
    {
        hex = '0x000000'
    }
    else if (typeof hex !== 'string')
    {
        var s = '000000' + hex.toString(16)
        hex = '0x' + s.substr(s.length - 6)
    }
    var result = /^0x?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

/**
 * rgb color to hex in the form of 0x123456
 * @param  {(number|string)} r first number or 'rgb(...)' string
 * @param  {(number|null)} g
 * @param  {(number|null)} b
 * @return {string}
 */
function rgbToHex(r, g, b)
{
    if (arguments.length === 1) {
        if (Array.isArray(arguments[0])) {
            var number = arguments[0]
            r = number[0]
            g = number[1]
            b = number[2]
        } else {
            var parse = r.replace(/( *rgb *\( *)|( )|(\) *;?)/,'')
            var numbers = parse.split(',')
            r = numbers[0]
            g = numbers[1]
            b = numbers[2]
        }
    }
    return '0x' + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1)
}

/**
 * returns a random color with balanced r, g, b values (i.e., r, g, b either have the same value or are 0)
 * @param {number} min value for random number
 * @param {number} max value for random number
 * @return {number} color
 */
function random(min, max)
{
    function random()
    {
        return Random.range(min, max)
    }

    var colors = [{r:1, g:1, b:1}, {r:1, g:1, b:0}, {r:1,g:0,b:1}, {r:0,g:1,b:1}, {r:1,g:0,b:0}, {r:0,g:1,b:0}, {r:0,g:0,b:1}]
    var color = Random.pick(colors)
    min = min || 0
    max = max || 255
    return this.rgbToHex(color.r ? random() : 0, color.g ? random() : 0, color.b ? random() : 0)
}

// h: 0-360, s: 0-1, l: 0-1
/**
 * returns a random color based on hsl
 * @param {number} hMin [0, 360]
 * @param {number} hMax [hMin, 360]
 * @param {number} sMin [0, 1]
 * @param {number} sMax [sMin, 1]
 * @param {number} lMin [0, 1]
 * @param {number} lMax [lMin, 1]
 */
function randomHSL(hMin, hMax, sMin, sMax, lMin, lMax)
{
    var color = {
        h: Random.range(hMin, hMax),
        s: Random.range(sMin, sMax, true),
        l: Random.range(lMin, lMax, true)
    }
    return this.hslToHex(color)
}

/**
 * returns random colors based on HSL with different hues
 * based on http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 * @returns {number[]} colors in hex format (0x123456)
 */
function randomGoldenRatioHSL(count, saturation, luminosity)
{
    var goldenRatio = 0.618033988749895
    var h = Random.get(1, true)
    var colors = []
    for (var i = 0; i < count; i++)
    {
        colors.push(this.hslToHex(h, saturation, luminosity))
        h = (h + goldenRatio) % 1
    }
    return colors
}

module.exports = {
    poundToHex: poundToHex,
    hexToPound: hexToPound,
    valueToPound: valueToPound,
    hexToHsl: hexToHsl,
    hslToHex: hslToHex,
    hexToRgb: hexToRgb,
    rgbToHex: rgbToHex,
    darken: darken,
    saturate: saturate,
    desaturate: desaturate,
    blend: blend,
    random: random,
    randomHSL: randomHSL,
    randomGoldenRatioHSL: randomGoldenRatioHSL
}
},{"yy-random":24}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// yy-random
// by David Figatner
// MIT license
// copyright YOPEY YOPEY LLC 2016-17
// https://github.com/davidfig/random

var seedrandom = require('seedrandom');

var Random = function () {
    function Random() {
        _classCallCheck(this, Random);

        this.generator = Math.random;
    }

    /**
     * generates a seeded number
     * @param {number} seed
     * @param {object} [options]
     * @param {string} [PRNG="alea"] - name of algorithm, see https://github.com/davidbau/seedrandom
     * @param {(boolean|string)} [state] - can include the state returned from save()
     */


    _createClass(Random, [{
        key: 'seed',
        value: function seed(_seed, options) {
            options = options || {};
            this.generator = seedrandom[options.PRNG || 'alea'](_seed, { state: options.state });
            this.options = options;
        }

        /**
         * saves the state of the random generator
         * can only be used after Random.seed() is called with options.state = true
         * @returns {number} state
         */

    }, {
        key: 'save',
        value: function save() {
            if (this.generator !== Math.random) {
                return this.generator.state();
            }
        }

        /**
         * restores the state of the random generator
         * @param {number} state
         */

    }, {
        key: 'restore',
        value: function restore(state) {
            this.generator = seedrandom[this.options.PRNG || 'alea']('', { state: state });
        }

        /**
         * changes the generator to use the old Math.sin-based random function
         * based on : http://stackoverflow.com/questions/521295/javascript-random-seeds
         * (deprecated) Use only for compatibility purposes
         * @param {number} seed
         */

    }, {
        key: 'seedOld',
        value: function seedOld(seed) {
            this.generator = function () {
                var x = Math.sin(seed++) * 10000;
                return x - Math.floor(x);
            };
        }

        /**
         * create a separate random generator using the seed
         * @param {number} seed
         * @return {object}
         */

    }, {
        key: 'separateSeed',
        value: function separateSeed(seed) {
            var random = new Random();
            random.seed(seed);
            return random;
        }

        /**
         * resets the random number this.generator to Math.random()
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.generator = Math.random;
        }

        /**
         * returns a random number using the this.generator between [0, ceiling - 1]
         * @param {number} ceiling
         * @param {boolean} [useFloat=false]
         * @return {number}
         */

    }, {
        key: 'get',
        value: function get(ceiling, useFloat) {
            var negative = ceiling < 0 ? -1 : 1;
            ceiling *= negative;
            var result = void 0;
            if (useFloat) {
                result = this.generator() * ceiling;
            } else {
                result = Math.floor(this.generator() * ceiling);
            }
            return result * negative;
        }

        /**
         * returns a random integer between 0 - Number.MAX_SAFE_INTEGER
         * @return {number}
         */

    }, {
        key: 'getHuge',
        value: function getHuge() {
            return this.get(Number.MAX_SAFE_INTEGER);
        }

        /**
         * random number [middle - range, middle + range]
         * @param {number} middle
         * @param {number} delta
         * @param {boolean} [useFloat=false]
         * @return {number}
         */

    }, {
        key: 'middle',
        value: function middle(_middle, delta, useFloat) {
            var half = delta / 2;
            return this.range(_middle - half, _middle + half, useFloat);
        }

        /**
         * random number [start, end]
         * @param {number} start
         * @param {number} end
         * @param {boolean} [useFloat=false] if true, then range is (start, end)--i.e., not inclusive to start and end
         * @return {number}
         */

    }, {
        key: 'range',
        value: function range(start, end, useFloat) {
            // case where there is no range
            if (end === start) {
                return end;
            }

            if (useFloat) {
                return this.get(end - start, true) + start;
            } else {
                var range = void 0;
                if (start < 0 && end > 0) {
                    range = -start + end + 1;
                } else if (start === 0 && end > 0) {
                    range = end + 1;
                } else if (start < 0 && end === 0) {
                    range = start - 1;
                    start = 1;
                } else if (start < 0 && end < 0) {
                    range = end - start - 1;
                } else {
                    range = end - start + 1;
                }
                return Math.floor(this.generator() * range) + start;
            }
        }

        /**
         * an array of random numbers between [start, end]
         * @param {number} start
         * @param {number} end
         * @param {number} count
         * @param {boolean} [useFloat=false]
         * @return {number[]}
         */

    }, {
        key: 'rangeMultiple',
        value: function rangeMultiple(start, end, count, useFloat) {
            var array = [];
            for (var i = 0; i < count; i++) {
                array.push(this.range(start, end, useFloat));
            }
            return array;
        }

        /**
         * an array of random numbers between [middle - range, middle + range]
         * @param {number} middle
         * @param {number} range
         * @param {number} count
         * @param {boolean} [useFloat=false]
         * @return {number[]}
         */

    }, {
        key: 'middleMultiple',
        value: function middleMultiple(middle, range, count, useFloat) {
            var array = [];
            for (var i = 0; i < count; i++) {
                array.push(middle(middle, range, useFloat));
            }
            return array;
        }

        /**
         * @param {number} [chance=0.5]
         * returns random sign (either +1 or -1)
         * @return {number}
         */

    }, {
        key: 'sign',
        value: function sign(chance) {
            chance = chance || 0.5;
            return this.generator() < chance ? 1 : -1;
        }

        /**
         * tells you whether a random chance was achieved
         * @param {number} [percent=0.5]
         * @return {boolean}
         */

    }, {
        key: 'chance',
        value: function chance(percent) {
            return this.generator() < (percent || 0.5);
        }

        /**
         * returns a random angle in radians [0 - 2 * Math.PI)
         */

    }, {
        key: 'angle',
        value: function angle() {
            return this.get(Math.PI * 2, true);
        }

        /**
         * Shuffle array (either in place or copied)
         * from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
         * @param {Array} array
         * @param {boolean} [copy=false] whether to shuffle in place (default) or return a new shuffled array
         * @return {Array} a shuffled array
         */

    }, {
        key: 'shuffle',
        value: function shuffle(array, copy) {
            if (copy) {
                array = array.slice();
            }
            if (array.length === 0) {
                return array;
            }

            var currentIndex = array.length,
                temporaryValue = void 0,
                randomIndex = void 0;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = this.get(currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        /**
         * picks a random element from an array
         * @param {Array} array
         * @return {*}
         */

    }, {
        key: 'pick',
        value: function pick(array, remove) {
            if (!remove) {
                return array[this.get(array.length)];
            } else {
                var pick = this.get(array.length);
                var temp = array[pick];
                array.splice(pick, 1);
                return temp;
            }
        }

        /**
         * returns a random property from an object
         * from http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
         * @param {object} obj
         * @return {*}
         */

    }, {
        key: 'property',
        value: function property(obj) {
            var result;
            var count = 0;
            for (var prop in obj) {
                if (this.chance(1 / ++count)) {
                    result = prop;
                }
            }
            return result;
        }

        /**
         * creates a random set where each entry is a value between [min, max]
         * @param {number} min
         * @param {number} max
         * @param {number} amount of numbers in set
         * @param {number[]}
         */

    }, {
        key: 'set',
        value: function set(min, max, amount) {
            var set = [],
                all = [],
                i;
            for (i = min; i < max; i++) {
                all.push(i);
            }

            for (i = 0; i < amount; i++) {
                var found = this.get(all.length);
                set.push(all[found]);
                all.splice(found, 1);
            }
            return set;
        }

        /**
         * returns a set of numbers with a randomly even distribution (i.e., no overlapping and filling the space)
         * @param {number} start position
         * @param {number} end position
         * @param {number} count of non-start/end points
         * @param {boolean} [includeStart=false] includes start point (count++)
         * @param {boolean} [includeEnd=false] includes end point (count++)
         * @param {boolean} [useFloat=false]
         * @param {number[]}
         */

    }, {
        key: 'distribution',
        value: function distribution(start, end, count, includeStart, includeEnd, useFloat) {
            var interval = Math.floor((end - start) / count);
            var halfInterval = interval / 2;
            var quarterInterval = interval / 4;
            var set = [];
            if (includeStart) {
                set.push(start);
            }
            for (var i = 0; i < count; i++) {
                set.push(start + i * interval + halfInterval + this.range(-quarterInterval, quarterInterval, useFloat));
            }
            if (includeEnd) {
                set.push(end);
            }
            return set;
        }

        /**
         * returns a random number based on weighted probability between [min, max]
         * from http://stackoverflow.com/questions/22656126/javascript-random-number-with-weighted-probability
         * @param {number} min value
         * @param {number} max value
         * @param {number} target for average value
         * @param {number} stddev - standard deviation
         */

    }, {
        key: 'weightedProbabilityInt',
        value: function weightedProbabilityInt(min, max, target, stddev) {
            function normRand() {
                var x1 = void 0,
                    x2 = void 0,
                    rad = void 0;
                do {
                    x1 = 2 * this.get(1, true) - 1;
                    x2 = 2 * this.get(1, true) - 1;
                    rad = x1 * x1 + x2 * x2;
                } while (rad >= 1 || rad === 0);
                var c = Math.sqrt(-2 * Math.log(rad) / rad);
                return x1 * c;
            }

            stddev = stddev || 1;
            if (Math.random() < 0.81546) {
                while (true) {
                    var sample = normRand() * stddev + target;
                    if (sample >= min && sample <= max) {
                        return sample;
                    }
                }
            } else {
                return this.range(min, max);
            }
        }

        /*
         * returns a random hex color (0 - 0xffffff)
         * @return {number}
         */

    }, {
        key: 'color',
        value: function color() {
            return this.get(0xffffff);
        }
    }]);

    return Random;
}();

module.exports = new Random();

},{"seedrandom":14}],25:[function(require,module,exports){

},{}]},{},[3]);
