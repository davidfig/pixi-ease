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
                var index = this.list.indexOf(animate);
                if (index !== -1) {
                    this.list.splice(index, 1);
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
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var entry = _step3.value;

                    if (!entry.pause) {
                        count++;
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

            return count;
        }
    }]);

    return Ease;
}(Events);

module.exports = Ease;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50cyIsInJlcXVpcmUiLCJBbmdsZSIsIkZhY2UiLCJMb2FkIiwiTW92aWUiLCJTaGFrZSIsIlRhcmdldCIsIlRpbnQiLCJUbyIsIldhaXQiLCJFYXNlIiwib3B0aW9ucyIsIm5vVGlja2VyIiwidGlja2VyIiwiUElYSSIsInNoYXJlZCIsImFkZCIsInVwZGF0ZSIsImRlbHRhVGltZSIsImxpc3QiLCJlbXB0eSIsInJlbW92ZVdhaXRpbmciLCJyZW1vdmVBbGxXYWl0aW5nIiwiZmlyc3QiLCJhcmd1bWVudHMiLCJhcmciLCJBcnJheSIsImlzQXJyYXkiLCJlbnRyeSIsInB1c2giLCJhbmltYXRlIiwiaW5VcGRhdGUiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJlbGFwc2VkIiwiaSIsIl9pIiwibGVuZ3RoIiwiZW1pdCIsInJlbW92ZUFsbCIsInJlbW92ZSIsInBvcCIsImNvdW50IiwicGF1c2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsU0FBU0MsUUFBUSxlQUFSLENBQWY7O0FBRUEsSUFBTUMsUUFBUUQsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNRSxPQUFPRixRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQU1HLE9BQU9ILFFBQVEsUUFBUixDQUFiO0FBQ0EsSUFBTUksUUFBUUosUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNSyxRQUFRTCxRQUFRLFNBQVIsQ0FBZDtBQUNBLElBQU1NLFNBQVNOLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTU8sT0FBT1AsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNUSxLQUFLUixRQUFRLE1BQVIsQ0FBWDtBQUNBLElBQU1TLE9BQU9ULFFBQVEsUUFBUixDQUFiOztJQUVNVSxJOzs7QUFFRjs7Ozs7Ozs7O0FBU0Esa0JBQVlDLE9BQVosRUFDQTtBQUFBOztBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFESjs7QUFH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QUFMLG9DQUFhUCxJQUFiLDJDQUFxQmUsU0FBckIsT0FBUDtBQUF5Qzs7OzRCQTVFbEQ7QUFDSSxtQkFBTyxLQUFLTCxJQUFMLENBQVVtQixNQUFqQjtBQUNIOztBQUVEOzs7Ozs7OzRCQUtBO0FBQ0ksZ0JBQUlLLFFBQVEsQ0FBWjtBQURKO0FBQUE7QUFBQTs7QUFBQTtBQUVJLHNDQUFrQixLQUFLeEIsSUFBdkIsbUlBQ0E7QUFBQSx3QkFEU1MsS0FDVDs7QUFDSSx3QkFBSSxDQUFDQSxNQUFNZ0IsS0FBWCxFQUNBO0FBQ0lEO0FBQ0g7QUFDSjtBQVJMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU0ksbUJBQU9BLEtBQVA7QUFDSDs7OztFQXpKYzVDLE07O0FBcU5uQjhDLE9BQU9DLE9BQVAsR0FBaUJwQyxJQUFqQiIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRXZlbnRzID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcblxyXG5jb25zdCBBbmdsZSA9IHJlcXVpcmUoJy4vYW5nbGUnKVxyXG5jb25zdCBGYWNlID0gcmVxdWlyZSgnLi9mYWNlJylcclxuY29uc3QgTG9hZCA9IHJlcXVpcmUoJy4vbG9hZCcpXHJcbmNvbnN0IE1vdmllID0gcmVxdWlyZSgnLi9tb3ZpZScpXHJcbmNvbnN0IFNoYWtlID0gcmVxdWlyZSgnLi9zaGFrZScpXHJcbmNvbnN0IFRhcmdldCA9IHJlcXVpcmUoJy4vdGFyZ2V0JylcclxuY29uc3QgVGludCA9IHJlcXVpcmUoJy4vdGludCcpXHJcbmNvbnN0IFRvID0gcmVxdWlyZSgnLi90bycpXHJcbmNvbnN0IFdhaXQgPSByZXF1aXJlKCcuL3dhaXQnKVxyXG5cclxuY2xhc3MgRWFzZSBleHRlbmRzIEV2ZW50c1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIE1haW4gY2xhc3MgZm9yIGNyZWF0aW5nIGVhc2VzXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm5vVGlja2VyXSBkb24ndCBhZGQgdGhlIHVwZGF0ZSBmdW5jdGlvbiB0byBQSVhJLnRpY2tlclxyXG4gICAgICogQHBhcmFtIHtQSVhJLnRpY2tlcn0gW29wdGlvbnMudGlja2VyPVBJWEkudGlja2VyLnNoYXJlZF0gdXNlIHRoaXMgUElYSS50aWNrZXIgZm9yIHRoZSBsaXN0XHJcbiAgICAgKiBAZXh0ZW5kcyBldmVudGVtaXR0ZXJcclxuICAgICAqIEBmaXJlIGRvbmVcclxuICAgICAqIEBmaXJlIGVhY2hcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICBpZiAoIW9wdGlvbnMubm9UaWNrZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCB0aWNrZXIgPSBvcHRpb25zLnRpY2tlciB8fCBQSVhJLnRpY2tlci5zaGFyZWRcclxuICAgICAgICAgICAgdGlja2VyLmFkZCgoKSA9PiB0aGlzLnVwZGF0ZSh0aWNrZXIuZGVsdGFUaW1lICogMTYuNjYpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZW1vdmVXYWl0aW5nID0gW11cclxuICAgICAgICB0aGlzLnJlbW92ZUFsbFdhaXRpbmcgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGFuaW1hdGlvbihzKSB0byBhbmltYXRpb24gbGlzdFxyXG4gICAgICogQHBhcmFtIHsob2JqZWN0fG9iamVjdFtdKX0gYW55IGFuaW1hdGlvbiBjbGFzc1xyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBmaXJzdCBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgYWRkKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZmlyc3RcclxuICAgICAgICBmb3IgKGxldCBhcmcgb2YgYXJndW1lbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgYXJnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlyc3QpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGVudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGVudHJ5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBhcmdcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5wdXNoKGFyZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtcHR5ID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gZmlyc3RcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbmltYXRpb24ocylcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSBhbmltYXRlIC0gdGhlIGFuaW1hdGlvbiAob3IgYXJyYXkgb2YgYW5pbWF0aW9ucykgdG8gcmVtb3ZlOyBjYW4gYmUgbnVsbFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoYW5pbWF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5pblVwZGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2FpdGluZy5wdXNoKGFuaW1hdGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2YoYW5pbWF0ZSlcclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlbW92ZSBhbGwgYW5pbWF0aW9ucyBmcm9tIGxpc3RcclxuICAgICAqIEBpbmhlcml0ZWQgZnJvbSB5eS1sb29wXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5VcGRhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFdhaXRpbmcgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGZyYW1lXHJcbiAgICAgKiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gUElYSS50aWNrZXIgdW5sZXNzIG9wdGlvbnMubm9UaWNrZXIgaXMgc2V0XHJcbiAgICAgKiBpZiB1c2luZyBvcHRpb25zLm5vVGlja2VyLCB0aGlzIHNob3VsZCBiZSBjYWxsZWQgbWFudWFsbHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbGFzcGVkIHRpbWUgaW4gTVMgc2luY2UgbGFzdCB1cGRhdGVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pblVwZGF0ZSA9IHRydWVcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0aGlzLmxpc3QubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbaV0gJiYgdGhpcy5saXN0W2ldLnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5lbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5VcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUFsbFdhaXRpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsV2FpdGluZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlICh0aGlzLnJlbW92ZVdhaXRpbmcubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5yZW1vdmVXYWl0aW5nLnBvcCgpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBhbmltYXRpb25zXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgY291bnQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgYWN0aXZlIGFuaW1hdGlvbnNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb3VudFJ1bm5pbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLmxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWVudHJ5LnBhdXNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBlYXNlc1xyXG4gICAgICogQHR5cGVkZWYge29iamVjdH0gRWFzZU9wdGlvbnNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbRWFzZU9wdGlvbnMub3B0aW9uc11cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbRWFzZU9wdGlvbnMub3B0aW9ucy53YWl0PTBdIG4gbWlsbGlzZWNvbmRzIGJlZm9yZSBzdGFydGluZyBhbmltYXRpb24gKGNhbiBhbHNvIGJlIHVzZWQgdG8gcGF1c2UgYW5pbWF0aW9uIGZvciBhIGxlbmd0aCBvZiB0aW1lKVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbRWFzZU9wdGlvbnMub3B0aW9ucy5wYXVzZV0gc3RhcnQgdGhlIGFuaW1hdGlvbiBwYXVzZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXJ9IFtFYXNlT3B0aW9ucy5vcHRpb25zLnJlcGVhdF0gdHJ1ZTogcmVwZWF0IGFuaW1hdGlvbiBmb3JldmVyIG46IHJlcGVhdCBhbmltYXRpb24gbiB0aW1lc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufG51bWJlcn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMucmV2ZXJzZV0gdHJ1ZTogcmV2ZXJzZSBhbmltYXRpb24gKGlmIGNvbWJpbmVkIHdpdGggcmVwZWF0LCB0aGVuIHB1bHNlKSBuOiByZXZlcnNlIGFuaW1hdGlvbiBuIHRpbWVzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbRWFzZU9wdGlvbnMub3B0aW9ucy5sb2FkXSBsb2FkcyBhbiBhbmltYXRpb24gdXNpbmcgYW4gLnNhdmUoKSBvYmplY3Qgbm90ZSB0aGUgKiBwYXJhbWV0ZXJzIGJlbG93IGNhbm5vdCBiZSBsb2FkZWQgYW5kIG11c3QgYmUgcmUtc2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xGdW5jdGlvbn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMuZWFzZV0gbmFtZSBvciBmdW5jdGlvbiBmcm9tIGVhc2luZy5qcyAoc2VlIGh0dHA6Ly9lYXNpbmdzLm5ldCBmb3IgZXhhbXBsZXMpXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVhc2UgcGFyYW1ldGVycyBvZiBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7UElYSS5EaXNwbGF5T2JqZWN0fSBvYmplY3QgdG8gYW5pbWF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGdvdG8gLSBwYXJhbWV0ZXJzIHRvIGFuaW1hdGUsIGUuZy46IHthbHBoYTogNSwgc2NhbGU6IHszLCA1fSwgc2NhbGU6IDUsIHJvdGF0aW9uOiBNYXRoLlBJfVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uIC0gdGltZSB0byBydW5cclxuICAgICAqIEBmaXJlcyBkb25lXHJcbiAgICAgKiBAZmlyZXMgd2FpdFxyXG4gICAgICogQGZpcmVzIGZpcnN0XHJcbiAgICAgKiBAZmlyZXMgZWFjaFxyXG4gICAgICogQGZpcmVzIGxvb3BcclxuICAgICAqIEBmaXJlcyByZXZlcnNlXHJcbiAgICAgKi9cclxuICAgIHRvKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFRvKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFuaW1hdGUgb2JqZWN0J3Mge3gsIHl9IHVzaW5nIGFuIGFuZ2xlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBpbiByYWRpYW5zXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWQgaW4gcGl4ZWxzL21pbGxpc2Vjb25kXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTBdIGluIG1pbGxpc2Vjb25kczsgaWYgMCwgdGhlbiBjb250aW51ZXMgZm9yZXZlclxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBAc2VlIHtAbGluayBXYWl0fVxyXG4gICAgICovXHJcbiAgICBhbmdsZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBBbmdsZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5mYWNlIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgZmFjZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBGYWNlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLmxvYWQgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBsb2FkKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IExvYWQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UubW92aWUgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBtb3ZpZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBNb3ZpZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5zaGFrZSBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHNoYWtlKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFNoYWtlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLnRhcmdldCBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHRhcmdldCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBUYXJnZXQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UuYW5nbGUgdGludDsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHRpbnQoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgVGludCguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS53YWl0IGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgd2FpdCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBXYWl0KC4uLmFyZ3VtZW50cykpIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFYXNlIl19