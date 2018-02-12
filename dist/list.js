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
                return _this.update(ticker.elapsedMS);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LmpzIl0sIm5hbWVzIjpbIlBJWEkiLCJyZXF1aXJlIiwiRXZlbnRzIiwiQW5nbGUiLCJGYWNlIiwiTG9hZCIsIk1vdmllIiwiU2hha2UiLCJUYXJnZXQiLCJUaW50IiwiVG8iLCJXYWl0IiwiRWFzZSIsIm9wdGlvbnMiLCJub1RpY2tlciIsInRpY2tlciIsInNoYXJlZCIsImFkZCIsInVwZGF0ZSIsImVsYXBzZWRNUyIsImxpc3QiLCJlbXB0eSIsInJlbW92ZVdhaXRpbmciLCJyZW1vdmVBbGxXYWl0aW5nIiwiZmlyc3QiLCJhcmd1bWVudHMiLCJhcmciLCJBcnJheSIsImlzQXJyYXkiLCJlbnRyeSIsInB1c2giLCJhbmltYXRlIiwiaW5VcGRhdGUiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJlbGFwc2VkIiwiaSIsIl9pIiwibGVuZ3RoIiwiZW1pdCIsInJlbW92ZUFsbCIsInJlbW92ZSIsInBvcCIsImNvdW50IiwicGF1c2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBT0MsUUFBUSxTQUFSLENBQWI7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLGVBQVIsQ0FBZjs7QUFFQSxJQUFNRSxRQUFRRixRQUFRLFNBQVIsQ0FBZDtBQUNBLElBQU1HLE9BQU9ILFFBQVEsUUFBUixDQUFiO0FBQ0EsSUFBTUksT0FBT0osUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNSyxRQUFRTCxRQUFRLFNBQVIsQ0FBZDtBQUNBLElBQU1NLFFBQVFOLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTU8sU0FBU1AsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNUSxPQUFPUixRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQU1TLEtBQUtULFFBQVEsTUFBUixDQUFYO0FBQ0EsSUFBTVUsT0FBT1YsUUFBUSxRQUFSLENBQWI7O0lBRU1XLEk7OztBQUVGOzs7Ozs7Ozs7QUFTQSxrQkFBWUMsT0FBWixFQUNBO0FBQUE7O0FB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TztBQUFFLG1CQUFPLEtBQUtSLEdBQUwsb0NBQWFOLElBQWIsMkNBQXFCYyxTQUFyQixPQUFQO0FBQXlDOzs7NEJBNUVsRDtBQUNJLG1CQUFPLEtBQUtMLElBQUwsQ0FBVW1CLE1BQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBS0E7QUFDSSxnQkFBSUssUUFBUSxDQUFaO0FBREo7QUFBQTtBQUFBOztBQUFBO0FBRUksc0NBQWtCLEtBQUt4QixJQUF2QixtSUFDQTtBQUFBLHdCQURTUyxLQUNUOztBQUNJLHdCQUFJLENBQUNBLE1BQU1nQixLQUFYLEVBQ0E7QUFDSUQ7QUFDSDtBQUNKO0FBUkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTSSxtQkFBT0EsS0FBUDtBQUNIOzs7O0VBekpjMUMsTTs7QUFxTm5CNEMsT0FBT0MsT0FBUCxHQUFpQm5DLElBQWpCIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpXHJcbmNvbnN0IEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5cclxuY29uc3QgQW5nbGUgPSByZXF1aXJlKCcuL2FuZ2xlJylcclxuY29uc3QgRmFjZSA9IHJlcXVpcmUoJy4vZmFjZScpXHJcbmNvbnN0IExvYWQgPSByZXF1aXJlKCcuL2xvYWQnKVxyXG5jb25zdCBNb3ZpZSA9IHJlcXVpcmUoJy4vbW92aWUnKVxyXG5jb25zdCBTaGFrZSA9IHJlcXVpcmUoJy4vc2hha2UnKVxyXG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKCcuL3RhcmdldCcpXHJcbmNvbnN0IFRpbnQgPSByZXF1aXJlKCcuL3RpbnQnKVxyXG5jb25zdCBUbyA9IHJlcXVpcmUoJy4vdG8nKVxyXG5jb25zdCBXYWl0ID0gcmVxdWlyZSgnLi93YWl0JylcclxuXHJcbmNsYXNzIEVhc2UgZXh0ZW5kcyBFdmVudHNcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIGNsYXNzIGZvciBjcmVhdGluZyBlYXNlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5ub1RpY2tlcl0gZG9uJ3QgYWRkIHRoZSB1cGRhdGUgZnVuY3Rpb24gdG8gUElYSS50aWNrZXJcclxuICAgICAqIEBwYXJhbSB7UElYSS50aWNrZXJ9IFtvcHRpb25zLnRpY2tlcj1QSVhJLnRpY2tlci5zaGFyZWRdIHVzZSB0aGlzIFBJWEkudGlja2VyIGZvciB0aGUgbGlzdFxyXG4gICAgICogQGV4dGVuZHMgZXZlbnRlbWl0dGVyXHJcbiAgICAgKiBAZmlyZSBkb25lXHJcbiAgICAgKiBAZmlyZSBlYWNoXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLm5vVGlja2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdGlja2VyID0gb3B0aW9ucy50aWNrZXIgfHwgUElYSS50aWNrZXIuc2hhcmVkXHJcbiAgICAgICAgICAgIHRpY2tlci5hZGQoKCkgPT4gdGhpcy51cGRhdGUodGlja2VyLmVsYXBzZWRNUykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICB0aGlzLnJlbW92ZVdhaXRpbmcgPSBbXVxyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsV2FpdGluZyA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYW5pbWF0aW9uKHMpIHRvIGFuaW1hdGlvbiBsaXN0XHJcbiAgICAgKiBAcGFyYW0geyhvYmplY3R8b2JqZWN0W10pfSBhbnkgYW5pbWF0aW9uIGNsYXNzXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGZpcnN0IGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICBhZGQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmaXJzdFxyXG4gICAgICAgIGZvciAobGV0IGFyZyBvZiBhcmd1bWVudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBhcmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZW50cnlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZW50cnkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGFyZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goYXJnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiBmaXJzdFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFuaW1hdGlvbihzKVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R8YXJyYXl9IGFuaW1hdGUgLSB0aGUgYW5pbWF0aW9uIChvciBhcnJheSBvZiBhbmltYXRpb25zKSB0byByZW1vdmU7IGNhbiBiZSBudWxsXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZShhbmltYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmluVXBkYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVXYWl0aW5nLnB1c2goYW5pbWF0ZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmxpc3QuaW5kZXhPZihhbmltYXRlKVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBhbmltYXRpb25zIGZyb20gbGlzdFxyXG4gICAgICogQGluaGVyaXRlZCBmcm9tIHl5LWxvb3BcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5pblVwZGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsV2FpdGluZyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgZnJhbWVcclxuICAgICAqIHRoaXMgaXMgYXV0b21hdGljYWxseSBhZGRlZCB0byBQSVhJLnRpY2tlciB1bmxlc3Mgb3B0aW9ucy5ub1RpY2tlciBpcyBzZXRcclxuICAgICAqIGlmIHVzaW5nIG9wdGlvbnMubm9UaWNrZXIsIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBtYW51YWxseVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVsYXNwZWQgdGltZSBpbiBNUyBzaW5jZSBsYXN0IHVwZGF0ZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGUoZWxhcHNlZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluVXBkYXRlID0gdHJ1ZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBfaSA9IHRoaXMubGlzdC5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXSAmJiB0aGlzLmxpc3RbaV0udXBkYXRlKGVsYXBzZWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICBpLS1cclxuICAgICAgICAgICAgICAgIF9pLS1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtaXQoJ2VhY2gnLCB0aGlzKVxyXG4gICAgICAgIGlmICh0aGlzLmxpc3QubGVuZ3RoID09PSAwICYmICF0aGlzLmVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pblVwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlQWxsV2FpdGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsKClcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxXYWl0aW5nID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKHRoaXMucmVtb3ZlV2FpdGluZy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnJlbW92ZVdhaXRpbmcucG9wKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnVtYmVyIG9mIGFuaW1hdGlvbnNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBhY3RpdmUgYW5pbWF0aW9uc1xyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvdW50UnVubmluZygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMubGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZW50cnkucGF1c2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdW50KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlZmF1bHQgb3B0aW9ucyBmb3IgYWxsIGVhc2VzXHJcbiAgICAgKiBAdHlwZWRlZiB7b2JqZWN0fSBFYXNlT3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtFYXNlT3B0aW9ucy5vcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtFYXNlT3B0aW9ucy5vcHRpb25zLndhaXQ9MF0gbiBtaWxsaXNlY29uZHMgYmVmb3JlIHN0YXJ0aW5nIGFuaW1hdGlvbiAoY2FuIGFsc28gYmUgdXNlZCB0byBwYXVzZSBhbmltYXRpb24gZm9yIGEgbGVuZ3RoIG9mIHRpbWUpXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtFYXNlT3B0aW9ucy5vcHRpb25zLnBhdXNlXSBzdGFydCB0aGUgYW5pbWF0aW9uIHBhdXNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufG51bWJlcn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMucmVwZWF0XSB0cnVlOiByZXBlYXQgYW5pbWF0aW9uIGZvcmV2ZXIgbjogcmVwZWF0IGFuaW1hdGlvbiBuIHRpbWVzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58bnVtYmVyfSBbRWFzZU9wdGlvbnMub3B0aW9ucy5yZXZlcnNlXSB0cnVlOiByZXZlcnNlIGFuaW1hdGlvbiAoaWYgY29tYmluZWQgd2l0aCByZXBlYXQsIHRoZW4gcHVsc2UpIG46IHJldmVyc2UgYW5pbWF0aW9uIG4gdGltZXNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtFYXNlT3B0aW9ucy5vcHRpb25zLmxvYWRdIGxvYWRzIGFuIGFuaW1hdGlvbiB1c2luZyBhbiAuc2F2ZSgpIG9iamVjdCBub3RlIHRoZSAqIHBhcmFtZXRlcnMgYmVsb3cgY2Fubm90IGJlIGxvYWRlZCBhbmQgbXVzdCBiZSByZS1zZXRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEZ1bmN0aW9ufSBbRWFzZU9wdGlvbnMub3B0aW9ucy5lYXNlXSBuYW1lIG9yIGZ1bmN0aW9uIGZyb20gZWFzaW5nLmpzIChzZWUgaHR0cDovL2Vhc2luZ3MubmV0IGZvciBleGFtcGxlcylcclxuICAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZWFzZSBwYXJhbWV0ZXJzIG9mIG9iamVjdFxyXG4gICAgICogQHBhcmFtIHtQSVhJLkRpc3BsYXlPYmplY3R9IG9iamVjdCB0byBhbmltYXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZ290byAtIHBhcmFtZXRlcnMgdG8gYW5pbWF0ZSwgZS5nLjoge2FscGhhOiA1LCBzY2FsZTogezMsIDV9LCBzY2FsZTogNSwgcm90YXRpb246IE1hdGguUEl9XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gLSB0aW1lIHRvIHJ1blxyXG4gICAgICogQGZpcmVzIGRvbmVcclxuICAgICAqIEBmaXJlcyB3YWl0XHJcbiAgICAgKiBAZmlyZXMgZmlyc3RcclxuICAgICAqIEBmaXJlcyBlYWNoXHJcbiAgICAgKiBAZmlyZXMgbG9vcFxyXG4gICAgICogQGZpcmVzIHJldmVyc2VcclxuICAgICAqL1xyXG4gICAgdG8oKSB7IHJldHVybiB0aGlzLmFkZChuZXcgVG8oLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYW5pbWF0ZSBvYmplY3QncyB7eCwgeX0gdXNpbmcgYW4gYW5nbGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgdG8gYW5pbWF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIGluIHJhZGlhbnNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCBpbiBwaXhlbHMvbWlsbGlzZWNvbmRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MF0gaW4gbWlsbGlzZWNvbmRzOyBpZiAwLCB0aGVuIGNvbnRpbnVlcyBmb3JldmVyXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIEBzZWUge0BsaW5rIFdhaXR9XHJcbiAgICAgKi9cclxuICAgIGFuZ2xlKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IEFuZ2xlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLmZhY2UgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBmYWNlKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IEZhY2UoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UubG9hZCBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIGxvYWQoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgTG9hZCguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5tb3ZpZSBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIG1vdmllKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IE1vdmllKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLnNoYWtlIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgc2hha2UoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgU2hha2UoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UudGFyZ2V0IGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgdGFyZ2V0KCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFRhcmdldCguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5hbmdsZSB0aW50OyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgdGludCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBUaW50KC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLndhaXQgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICB3YWl0KCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFdhaXQoLi4uYXJndW1lbnRzKSkgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVhc2UiXX0=