'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PIXI = require('pixi.js');
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
     * @param {PIXI.ticker} [options.ticker=PIXI.ticker.shared|PIXI.Ticker.shared] use this PIXI.ticker for the list
     * @extends eventemitter
     * @fire done
     * @fire each
     */
    function Ease(options) {
        _classCallCheck(this, Ease);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (Ease.__proto__ || Object.getPrototypeOf(Ease)).call(this));

        if (!options.noTicker) {
            var ticker = options.ticker || (PIXI.Ticker ? PIXI.Ticker.shared : PIXI.ticker.shared);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LmpzIl0sIm5hbWVzIjpbIlBJWEkiLCJyZXF1aXJlIiwiRXZlbnRzIiwiQW5nbGUiLCJGYWNlIiwiTG9hZCIsIk1vdmllIiwiU2hha2UiLCJUYXJnZXQiLCJUaW50IiwiVG8iLCJXYWl0IiwiRWFzZSIsIm9wdGlvbnMiLCJub1RpY2tlciIsInRpY2tlciIsIlRpY2tlciIsInNoYXJlZCIsImFkZCIsInVwZGF0ZSIsImRlbHRhVGltZSIsImxpc3QiLCJlbXB0eSIsInJlbW92ZVdhaXRpbmciLCJyZW1vdmVBbGxXYWl0aW5nIiwiZmlyc3QiLCJhcmd1bWVudHMiLCJhcmciLCJBcnJheSIsImlzQXJyYXkiLCJlbnRyeSIsInB1c2giLCJhbmltYXRlIiwiaW5VcGRhdGUiLCJlYWNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZWxhcHNlZCIsImkiLCJfaSIsImxlbmd0aCIsImVtaXQiLCJyZW1vdmVBbGwiLCJyZW1vdmUiLCJwb3AiLCJjb3VudCIsInBhdXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU9DLFFBQVEsU0FBUixDQUFiO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUSxlQUFSLENBQWY7O0FBRUEsSUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNRyxPQUFPSCxRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQU1JLE9BQU9KLFFBQVEsUUFBUixDQUFiO0FBQ0EsSUFBTUssUUFBUUwsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNTSxRQUFRTixRQUFRLFNBQVIsQ0FBZDtBQUNBLElBQU1PLFNBQVNQLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTVEsT0FBT1IsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNUyxLQUFLVCxRQUFRLE1BQVIsQ0FBWDtBQUNBLElBQU1VLE9BQU9WLFFBQVEsUUFBUixDQUFiOztJQUVNVyxJOzs7QUFFRjs7Ozs7Ozs7O0FBU0Esa0JBQVlDLE9B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cmVxdWlyZSgncGl4aS5qcycpXHJcbmNvbnN0IEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5cclxuY29uc3QgQW5nbGUgPSByZXF1aXJlKCcuL2FuZ2xlJylcclxuY29uc3QgRmFjZSA9IHJlcXVpcmUoJy4vZmFjZScpXHJcbmNvbnN0IExvYWQgPSByZXF1aXJlKCcuL2xvYWQnKVxyXG5jb25zdCBNb3ZpZSA9IHJlcXVpcmUoJy4vbW92aWUnKVxyXG5jb25zdCBTaGFrZSA9IHJlcXVpcmUoJy4vc2hha2UnKVxyXG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKCcuL3RhcmdldCcpXHJcbmNvbnN0IFRpbnQgPSByZXF1aXJlKCcuL3RpbnQnKVxyXG5jb25zdCBUbyA9IHJlcXVpcmUoJy4vdG8nKVxyXG5jb25zdCBXYWl0ID0gcmVxdWlyZSgnLi93YWl0JylcclxuXHJcbmNsYXNzIEVhc2UgZXh0ZW5kcyBFdmVudHNcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIGNsYXNzIGZvciBjcmVhdGluZyBlYXNlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5ub1RpY2tlcl0gZG9uJ3QgYWRkIHRoZSB1cGRhdGUgZnVuY3Rpb24gdG8gUElYSS50aWNrZXJcclxuICAgICAqIEBwYXJhbSB7UElYSS50aWNrZXJ9IFtvcHRpb25zLnRpY2tlcj1QSVhJLnRpY2tlci5zaGFyZWR8UElYSS5UaWNrZXIuc2hhcmVkXSB1c2UgdGhpcyBQSVhJLnRpY2tlciBmb3IgdGhlIGxpc3RcclxuICAgICAqIEBleHRlbmRzIGV2ZW50ZW1pdHRlclxyXG4gICAgICogQGZpcmUgZG9uZVxyXG4gICAgICogQGZpcmUgZWFjaFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKVxyXG4gICAge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIGlmICghb3B0aW9ucy5ub1RpY2tlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpY2tlciA9IG9wdGlvbnMudGlja2VyIHx8IChQSVhJLlRpY2tlciA/IFBJWEkuVGlja2VyLnNoYXJlZCA6IFBJWEkudGlja2VyLnNoYXJlZClcclxuICAgICAgICAgICAgdGlja2VyLmFkZCgoKSA9PiB0aGlzLnVwZGF0ZSh0aWNrZXIuZGVsdGFUaW1lICogMTYuNjYpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZW1vdmVXYWl0aW5nID0gW11cclxuICAgICAgICB0aGlzLnJlbW92ZUFsbFdhaXRpbmcgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGFuaW1hdGlvbihzKSB0byBhbmltYXRpb24gbGlzdFxyXG4gICAgICogQHBhcmFtIHsob2JqZWN0fG9iamVjdFtdKX0gYW55IGFuaW1hdGlvbiBjbGFzc1xyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBmaXJzdCBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgYWRkKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZmlyc3RcclxuICAgICAgICBmb3IgKGxldCBhcmcgb2YgYXJndW1lbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgYXJnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGVudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGVudHJ5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBhcmdcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGFyZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtcHR5ID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gZmlyc3RcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbmltYXRpb24ocylcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSBhbmltYXRlIC0gdGhlIGFuaW1hdGlvbiAob3IgYXJyYXkgb2YgYW5pbWF0aW9ucykgdG8gcmVtb3ZlOyBjYW4gYmUgbnVsbFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoYW5pbWF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5pblVwZGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2FpdGluZy5wdXNoKGFuaW1hdGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFuaW1hdGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlYWNoIG9mIGFuaW1hdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihlYWNoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2YoYW5pbWF0ZSlcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbGwgYW5pbWF0aW9ucyBmcm9tIGxpc3RcclxuICAgICAqIEBpbmhlcml0ZWQgZnJvbSB5eS1sb29wXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5VcGRhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFdhaXRpbmcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGZyYW1lXHJcbiAgICAgKiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gUElYSS50aWNrZXIgdW5sZXNzIG9wdGlvbnMubm9UaWNrZXIgaXMgc2V0XHJcbiAgICAgKiBpZiB1c2luZyBvcHRpb25zLm5vVGlja2VyLCB0aGlzIHNob3VsZCBiZSBjYWxsZWQgbWFudWFsbHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbGFzcGVkIHRpbWUgaW4gTVMgc2luY2UgbGFzdCB1cGRhdGVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pblVwZGF0ZSA9IHRydWVcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbaV0gJiYgdGhpcy5saXN0W2ldLnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5lbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5VcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUFsbFdhaXRpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsV2FpdGluZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh0aGlzLnJlbW92ZVdhaXRpbmcubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5yZW1vdmVXYWl0aW5nLnBvcCgpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBhbmltYXRpb25zXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgY291bnQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgYWN0aXZlIGFuaW1hdGlvbnNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb3VudFJ1bm5pbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLmxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWVudHJ5LnBhdXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBlYXNlc1xyXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gRWFzZU9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbRWFzZU9wdGlvbnMub3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbRWFzZU9wdGlvbnMub3B0aW9ucy53YWl0PTBdIG4gbWlsbGlzZWNvbmRzIGJlZm9yZSBzdGFydGluZyBhbmltYXRpb24gKGNhbiBhbHNvIGJlIHVzZWQgdG8gcGF1c2UgYW5pbWF0aW9uIGZvciBhIGxlbmd0aCBvZiB0aW1lKVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbRWFzZU9wdGlvbnMub3B0aW9ucy5wYXVzZV0gc3RhcnQgdGhlIGFuaW1hdGlvbiBwYXVzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXJ9IFtFYXNlT3B0aW9ucy5vcHRpb25zLnJlcGVhdF0gdHJ1ZTogcmVwZWF0IGFuaW1hdGlvbiBmb3JldmVyIG46IHJlcGVhdCBhbmltYXRpb24gbiB0aW1lc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufG51bWJlcn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMucmV2ZXJzZV0gdHJ1ZTogcmV2ZXJzZSBhbmltYXRpb24gKGlmIGNvbWJpbmVkIHdpdGggcmVwZWF0LCB0aGVuIHB1bHNlKSBuOiByZXZlcnNlIGFuaW1hdGlvbiBuIHRpbWVzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbRWFzZU9wdGlvbnMub3B0aW9ucy5sb2FkXSBsb2FkcyBhbiBhbmltYXRpb24gdXNpbmcgYW4gLnNhdmUoKSBvYmplY3Qgbm90ZSB0aGUgKiBwYXJhbWV0ZXJzIGJlbG93IGNhbm5vdCBiZSBsb2FkZWQgYW5kIG11c3QgYmUgcmUtc2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xGdW5jdGlvbn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMuZWFzZV0gbmFtZSBvciBmdW5jdGlvbiBmcm9tIGVhc2luZy5qcyAoc2VlIGh0dHA6Ly9lYXNpbmdzLm5ldCBmb3IgZXhhbXBsZXMpXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVhc2UgcGFyYW1ldGVycyBvZiBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7UElYSS5EaXNwbGF5T2JqZWN0fSBvYmplY3QgdG8gYW5pbWF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGdvdG8gLSBwYXJhbWV0ZXJzIHRvIGFuaW1hdGUsIGUuZy46IHthbHBoYTogNSwgc2NhbGU6IHszLCA1fSwgc2NhbGU6IDUsIHJvdGF0aW9uOiBNYXRoLlBJfVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIC0gdGltZSB0byBydW5cclxuICAgICAqIEBmaXJlcyBkb25lXHJcbiAgICAgKiBAZmlyZXMgd2FpdFxyXG4gICAgICogQGZpcmVzIGZpcnN0XHJcbiAgICAgKiBAZmlyZXMgZWFjaFxyXG4gICAgICogQGZpcmVzIGxvb3BcclxuICAgICAqIEBmaXJlcyByZXZlcnNlXHJcbiAgICAgKi9cclxuICAgIHRvKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFRvKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFuaW1hdGUgb2JqZWN0J3Mge3gsIHl9IHVzaW5nIGFuIGFuZ2xlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBpbiByYWRpYW5zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWQgaW4gcGl4ZWxzL21pbGxpc2Vjb25kXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTBdIGluIG1pbGxpc2Vjb25kczsgaWYgMCwgdGhlbiBjb250aW51ZXMgZm9yZXZlclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBAc2VlIHtAbGluayBXYWl0fVxyXG4gICAgICovXHJcbiAgICBhbmdsZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBBbmdsZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5mYWNlIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgZmFjZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBGYWNlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLmxvYWQgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBsb2FkKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IExvYWQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UubW92aWUgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBtb3ZpZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBNb3ZpZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5zaGFrZSBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHNoYWtlKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFNoYWtlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLnRhcmdldCBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHRhcmdldCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBUYXJnZXQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UuYW5nbGUgdGludDsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHRpbnQoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgVGludCguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS53YWl0IGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgd2FpdCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBXYWl0KC4uLmFyZ3VtZW50cykpIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFYXNlIl19