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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LmpzIl0sIm5hbWVzIjpbIkV2ZW50cyIsInJlcXVpcmUiLCJBbmdsZSIsIkZhY2UiLCJMb2FkIiwiTW92aWUiLCJTaGFrZSIsIlRhcmdldCIsIlRpbnQiLCJUbyIsIldhaXQiLCJFYXNlIiwib3B0aW9ucyIsIm5vVGlja2VyIiwidGlja2VyIiwiUElYSSIsInNoYXJlZCIsImFkZCIsInVwZGF0ZSIsImRlbHRhVGltZSIsImxpc3QiLCJlbXB0eSIsInJlbW92ZVdhaXRpbmciLCJyZW1vdmVBbGxXYWl0aW5nIiwiZmlyc3QiLCJhcmd1bWVudHMiLCJhcmciLCJBcnJheSIsImlzQXJyYXkiLCJlbnRyeSIsInB1c2giLCJhbmltYXRlIiwiaW5VcGRhdGUiLCJlYWNoIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZWxhcHNlZCIsImkiLCJfaSIsImxlbmd0aCIsImVtaXQiLCJyZW1vdmVBbGwiLCJyZW1vdmUiLCJwb3AiLCJjb3VudCIsInBhdXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU1BLFNBQVNDLFFBQVEsZUFBUixDQUFmOztBQUVBLElBQU1DLFFBQVFELFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTUUsT0FBT0YsUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNRyxPQUFPSCxRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQU1JLFFBQVFKLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBTUssUUFBUUwsUUFBUSxTQUFSLENBQWQ7QUFDQSxJQUFNTSxTQUFTTixRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1PLE9BQU9QLFFBQVEsUUFBUixDQUFiO0FBQ0EsSUFBTVEsS0FBS1IsUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFNUyxPQUFPVCxRQUFRLFFBQVIsQ0FBYjs7SUFFTVUsSTs7O0FBRUY7Ozs7Ozs7OztBQVNBLGtCQUFZQyxPQUFaLEVBQ0E7QUFBQTs7QUFDSUEsa0JBQVVBLFdBQVcsRUFBckI7O0FB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QXFCcUIsU0FBckIsT0FBUDtBQUF5Qzs7QUFFbEQ7Ozs7Z0NBQ1E7QUFBRSxtQkFBTyxLQUFLUixHQUFMLG9DQUFhWixLQUFiLDJDQUFzQm9CLFNBQXRCLE9BQVA7QUFBMEM7O0FBRXBEOzs7O2dDQUNRO0FBQUUsbUJBQU8sS0FBS1IsR0FBTCxvQ0FBYVgsS0FBYiwyQ0FBc0JtQixTQUF0QixPQUFQO0FBQTBDOztBQUVwRDs7OztpQ0FDUztBQUFFLG1CQUFPLEtBQUtSLEdBQUwsb0NBQWFWLE1BQWIsMkNBQXVCa0IsU0FBdkIsT0FBUDtBQUEyQzs7QUFFdEQ7Ozs7K0JBQ087QUFBRSxtQkFBTyxLQUFLUixHQUFMLG9DQUFhVCxJQUFiLDJDQUFxQmlCLFNBQXJCLE9BQVA7QUFBeUM7O0FBRWxEOzs7OytCQUNPO0FBQUUsbUJBQU8sS0FBS1IsR0FBTCxvQ0FBYVAsSUFBYiwyQ0FBcUJlLFNBQXJCLE9BQVA7QUFBeUM7Ozs0QkE1RWxEO0FBQ0ksbUJBQU8sS0FBS0wsSUFBTCxDQUFVb0IsTUFBakI7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFLQTtBQUNJLGdCQUFJSyxRQUFRLENBQVo7QUFESjtBQUFBO0FBQUE7O0FBQUE7QUFFSSxzQ0FBa0IsS0FBS3pCLElBQXZCLG1JQUNBO0FBQUEsd0JBRFNTLEtBQ1Q7O0FBQ0ksd0JBQUksQ0FBQ0EsTUFBTWlCLEtBQVgsRUFDQTtBQUNJRDtBQUNIO0FBQ0o7QUFSTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVNJLG1CQUFPQSxLQUFQO0FBQ0g7Ozs7RUF2S2M3QyxNOztBQW1PbkIrQyxPQUFPQyxPQUFQLEdBQWlCckMsSUFBakIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5cclxuY29uc3QgQW5nbGUgPSByZXF1aXJlKCcuL2FuZ2xlJylcclxuY29uc3QgRmFjZSA9IHJlcXVpcmUoJy4vZmFjZScpXHJcbmNvbnN0IExvYWQgPSByZXF1aXJlKCcuL2xvYWQnKVxyXG5jb25zdCBNb3ZpZSA9IHJlcXVpcmUoJy4vbW92aWUnKVxyXG5jb25zdCBTaGFrZSA9IHJlcXVpcmUoJy4vc2hha2UnKVxyXG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKCcuL3RhcmdldCcpXHJcbmNvbnN0IFRpbnQgPSByZXF1aXJlKCcuL3RpbnQnKVxyXG5jb25zdCBUbyA9IHJlcXVpcmUoJy4vdG8nKVxyXG5jb25zdCBXYWl0ID0gcmVxdWlyZSgnLi93YWl0JylcclxuXHJcbmNsYXNzIEVhc2UgZXh0ZW5kcyBFdmVudHNcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIGNsYXNzIGZvciBjcmVhdGluZyBlYXNlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5ub1RpY2tlcl0gZG9uJ3QgYWRkIHRoZSB1cGRhdGUgZnVuY3Rpb24gdG8gUElYSS50aWNrZXJcclxuICAgICAqIEBwYXJhbSB7UElYSS50aWNrZXJ9IFtvcHRpb25zLnRpY2tlcj1QSVhJLnRpY2tlci5zaGFyZWRdIHVzZSB0aGlzIFBJWEkudGlja2VyIGZvciB0aGUgbGlzdFxyXG4gICAgICogQGV4dGVuZHMgZXZlbnRlbWl0dGVyXHJcbiAgICAgKiBAZmlyZSBkb25lXHJcbiAgICAgKiBAZmlyZSBlYWNoXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLm5vVGlja2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdGlja2VyID0gb3B0aW9ucy50aWNrZXIgfHwgUElYSS50aWNrZXIuc2hhcmVkXHJcbiAgICAgICAgICAgIHRpY2tlci5hZGQoKCkgPT4gdGhpcy51cGRhdGUodGlja2VyLmRlbHRhVGltZSAqIDE2LjY2KSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0ID0gW11cclxuICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucmVtb3ZlV2FpdGluZyA9IFtdXHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxXYWl0aW5nID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbmltYXRpb24ocykgdG8gYW5pbWF0aW9uIGxpc3RcclxuICAgICAqIEBwYXJhbSB7KG9iamVjdHxvYmplY3RbXSl9IGFueSBhbmltYXRpb24gY2xhc3NcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gZmlyc3QgYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgIGFkZCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZpcnN0XHJcbiAgICAgICAgZm9yIChsZXQgYXJnIG9mIGFyZ3VtZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIGFyZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBlbnRyeVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChlbnRyeSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gYXJnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QucHVzaChhcmcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGZpcnN0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYW5pbWF0aW9uKHMpXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdHxhcnJheX0gYW5pbWF0ZSAtIHRoZSBhbmltYXRpb24gKG9yIGFycmF5IG9mIGFuaW1hdGlvbnMpIHRvIHJlbW92ZTsgY2FuIGJlIG51bGxcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKGFuaW1hdGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5VcGRhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdhaXRpbmcucHVzaChhbmltYXRlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhbmltYXRlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZWFjaCBvZiBhbmltYXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0LmluZGV4T2YoZWFjaClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubGlzdC5pbmRleE9mKGFuaW1hdGUpXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYWxsIGFuaW1hdGlvbnMgZnJvbSBsaXN0XHJcbiAgICAgKiBAaW5oZXJpdGVkIGZyb20geXktbG9vcFxyXG4gICAgICovXHJcbiAgICByZW1vdmVBbGwoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmluVXBkYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxXYWl0aW5nID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHVwZGF0ZSBmcmFtZVxyXG4gICAgICogdGhpcyBpcyBhdXRvbWF0aWNhbGx5IGFkZGVkIHRvIFBJWEkudGlja2VyIHVubGVzcyBvcHRpb25zLm5vVGlja2VyIGlzIHNldFxyXG4gICAgICogaWYgdXNpbmcgb3B0aW9ucy5ub1RpY2tlciwgdGhpcyBzaG91bGQgYmUgY2FsbGVkIG1hbnVhbGx5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZWxhc3BlZCB0aW1lIGluIE1TIHNpbmNlIGxhc3QgdXBkYXRlXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaW5VcGRhdGUgPSB0cnVlXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldICYmIHRoaXMubGlzdFtpXS51cGRhdGUoZWxhcHNlZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLVxyXG4gICAgICAgICAgICAgICAgX2ktLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1pdCgnZWFjaCcsIHRoaXMpXHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5sZW5ndGggPT09IDAgJiYgIXRoaXMuZW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCB0aGlzKVxyXG4gICAgICAgICAgICB0aGlzLmVtcHR5ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluVXBkYXRlID0gZmFsc2VcclxuICAgICAgICBpZiAodGhpcy5yZW1vdmVBbGxXYWl0aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGwoKVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFdhaXRpbmcgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodGhpcy5yZW1vdmVXYWl0aW5nLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucmVtb3ZlV2FpdGluZy5wb3AoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBudW1iZXIgb2YgYW5pbWF0aW9uc1xyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvdW50KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnVtYmVyIG9mIGFjdGl2ZSBhbmltYXRpb25zXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgY291bnRSdW5uaW5nKClcclxuICAgIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5saXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFlbnRyeS5wYXVzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVmYXVsdCBvcHRpb25zIGZvciBhbGwgZWFzZXNcclxuICAgICAqIEB0eXBlZGVmIHtvYmplY3R9IEVhc2VPcHRpb25zXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW0Vhc2VPcHRpb25zLm9wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMud2FpdD0wXSBuIG1pbGxpc2Vjb25kcyBiZWZvcmUgc3RhcnRpbmcgYW5pbWF0aW9uIChjYW4gYWxzbyBiZSB1c2VkIHRvIHBhdXNlIGFuaW1hdGlvbiBmb3IgYSBsZW5ndGggb2YgdGltZSlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMucGF1c2VdIHN0YXJ0IHRoZSBhbmltYXRpb24gcGF1c2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58bnVtYmVyfSBbRWFzZU9wdGlvbnMub3B0aW9ucy5yZXBlYXRdIHRydWU6IHJlcGVhdCBhbmltYXRpb24gZm9yZXZlciBuOiByZXBlYXQgYW5pbWF0aW9uIG4gdGltZXNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXJ9IFtFYXNlT3B0aW9ucy5vcHRpb25zLnJldmVyc2VdIHRydWU6IHJldmVyc2UgYW5pbWF0aW9uIChpZiBjb21iaW5lZCB3aXRoIHJlcGVhdCwgdGhlbiBwdWxzZSkgbjogcmV2ZXJzZSBhbmltYXRpb24gbiB0aW1lc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW0Vhc2VPcHRpb25zLm9wdGlvbnMubG9hZF0gbG9hZHMgYW4gYW5pbWF0aW9uIHVzaW5nIGFuIC5zYXZlKCkgb2JqZWN0IG5vdGUgdGhlICogcGFyYW1ldGVycyBiZWxvdyBjYW5ub3QgYmUgbG9hZGVkIGFuZCBtdXN0IGJlIHJlLXNldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8RnVuY3Rpb259IFtFYXNlT3B0aW9ucy5vcHRpb25zLmVhc2VdIG5hbWUgb3IgZnVuY3Rpb24gZnJvbSBlYXNpbmcuanMgKHNlZSBodHRwOi8vZWFzaW5ncy5uZXQgZm9yIGV4YW1wbGVzKVxyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBlYXNlIHBhcmFtZXRlcnMgb2Ygb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge1BJWEkuRGlzcGxheU9iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBnb3RvIC0gcGFyYW1ldGVycyB0byBhbmltYXRlLCBlLmcuOiB7YWxwaGE6IDUsIHNjYWxlOiB7MywgNX0sIHNjYWxlOiA1LCByb3RhdGlvbjogTWF0aC5QSX1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiAtIHRpbWUgdG8gcnVuXHJcbiAgICAgKiBAZmlyZXMgZG9uZVxyXG4gICAgICogQGZpcmVzIHdhaXRcclxuICAgICAqIEBmaXJlcyBmaXJzdFxyXG4gICAgICogQGZpcmVzIGVhY2hcclxuICAgICAqIEBmaXJlcyBsb29wXHJcbiAgICAgKiBAZmlyZXMgcmV2ZXJzZVxyXG4gICAgICovXHJcbiAgICB0bygpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBUbyguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhbmltYXRlIG9iamVjdCdzIHt4LCB5fSB1c2luZyBhbiBhbmdsZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCB0byBhbmltYXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgaW4gcmFkaWFuc1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkIGluIHBpeGVscy9taWxsaXNlY29uZFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0wXSBpbiBtaWxsaXNlY29uZHM7IGlmIDAsIHRoZW4gY29udGludWVzIGZvcmV2ZXJcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gQHNlZSB7QGxpbmsgV2FpdH1cclxuICAgICAqL1xyXG4gICAgYW5nbGUoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgQW5nbGUoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UuZmFjZSBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIGZhY2UoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgRmFjZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5sb2FkIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgbG9hZCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBMb2FkKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLm1vdmllIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgbW92aWUoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgTW92aWUoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2Uuc2hha2UgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBzaGFrZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBTaGFrZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS50YXJnZXQgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICB0YXJnZXQoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgVGFyZ2V0KC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLmFuZ2xlIHRpbnQ7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICB0aW50KCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFRpbnQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2Uud2FpdCBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHdhaXQoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgV2FpdCguLi5hcmd1bWVudHMpKSB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRWFzZSJdfQ==