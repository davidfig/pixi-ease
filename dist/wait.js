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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93YWl0LmpzIl0sIm5hbWVzIjpbIkVhc2luZyIsInJlcXVpcmUiLCJFdmVudEVtaXR0ZXIiLCJ3YWl0Iiwib2JqZWN0Iiwib3B0aW9ucyIsInR5cGUiLCJsb2FkIiwidGltZSIsImVhc2UiLCJlYXNlTmFtZSIsInNhdmUiLCJkdXJhdGlvbiIsImlkIiwicGF1c2UiLCJyZXBlYXQiLCJyZXZlcnNlIiwibGVmdE92ZXIiLCJlbWl0IiwibGlzdCIsImRvbmUiLCJlbGFwc2VkIiwiZmlyc3QiLCJmb3JjZSIsImNhbGN1bGF0ZSIsImVuZCIsImtleSIsInZhbHVlIiwiaXNOYU4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxJQUFNQyxlQUFlRCxRQUFRLGVBQVIsQ0FBckI7O0lBRU1FLEk7OztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLGtCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUNBO0FBQUE7O0FBQUE7O0FBRUksY0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsY0FBS0MsT0FBTCxHQUFlQSxXQUFXLEVBQTFCO0FBQ0EsY0FBS0MsSUFBTCxHQUFZLE1BQVo7QUFDQSxZQUFJLE1BQUtELE9BQUwsQ0FBYUUsSUFBakIsRUFDQTtBQUNJLGtCQUFLQSxJQUFMLENBQVUsTUFBS0YsT0FBTCxDQUFhRSxJQUF2QjtBQUNILFNBSEQsTUFLQTtBQUNJLGtCQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNIO0FBQ0QsWUFBSSxNQUFLSCxPQUFMLENBQWFJLElBQWIsSUFBcUIsT0FBTyxNQUFLSixPQUFMLENBQWFJLElBQXBCLEtBQTZCLFVBQXRELEVBQ0E7QUFDSSxrQkFBS0osT0FBTCxDQUFhSyxRQUFiLEdBQXdCLE1BQUtMLE9BQUwsQ0FBYUksSUFBckM7QUFDQSxrQkFBS0osT0FBTCxDQUFhSSxJQUFiLEdBQW9CVCxPQUFPLE1BQUtLLE9BQUwsQ0FBYUks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V0FBVyxDQUFmO0FBQ0EsZ0JBQU1MLFdBQVcsS0FBS0EsUUFBdEI7QUFDQSxnQkFBSUosT0FBTyxLQUFLQSxJQUFoQjtBQUNBLGdCQUFJSSxhQUFhLENBQWIsSUFBa0JKLE9BQU9JLFFBQTdCLEVBQ0E7QUFDSUssMkJBQVdULE9BQU9JLFFBQWxCO0FBQ0EscUJBQUtKLElBQUwsR0FBWUEsT0FBT0ksUUFBbkI7QUFDSDtBQUNELGdCQUFNVyxRQUFRLEtBQUtDLFNBQUwsQ0FBZUgsT0FBZixDQUFkO0FBQ0EsaUJBQUtILElBQUwsQ0FBVSxNQUFWLEVBQWtCRyxPQUFsQixFQUEyQixLQUFLRixJQUFMLElBQWEsS0FBS2YsTUFBN0MsRUFBcUQsSUFBckQ7QUFDQSxnQkFBSSxLQUFLRSxJQUFMLEtBQWMsTUFBZCxJQUF5Qk0sYUFBYSxDQUFiLElBQWtCSixTQUFTSSxRQUF4RCxFQUNBO0FBQ0ksdUJBQU8sS0FBS2EsR0FBTCxDQUFTUixRQUFULENBQVA7QUFDSDtBQUNELG1CQUFPTSxTQUFTZixTQUFTSSxRQUF6QjtBQUNIOztBQUVEOzs7O29DQUNZYyxHLEVBQUtDLEssRUFDakI7QUFDSSxvQkFBUUQsR0FBUjtBQUVJLHFCQUFLLFNBQUw7QUFDSSwyQkFBUUUsTUFBTUQsS0FBTixDQUFELEdBQWlCLENBQWpCLEdBQXFCQSxLQUE1QjtBQUhSO0FBS0EsbUJBQU9BLEtBQVA7QUFDSDs7O2tDQUVTLENBQUU7OztvQ0FDQSxDQUFHOzs7K0JBQ1IsQ0FBRzs7OzBCQTlHQUEsSyxFQUNWO0FBQ0ksaUJBQUt0QixPQUFMLENBQWFTLEtBQWIsR0FBcUJhLEtBQXJCO0FBQ0gsUzs0QkFFRDtBQUNJLG1CQUFPLEtBQUt0QixPQUFMLENBQWFTLEtBQXBCO0FBQ0g7Ozs7RUF6R2NaLFk7O0FBbU5uQjJCLE9BQU9DLE9BQVAsR0FBaUIzQixJQUFqQiIsImZpbGUiOiJ3YWl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRWFzaW5nID0gcmVxdWlyZSgncGVubmVyJylcclxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcblxyXG5jbGFzcyB3YWl0IGV4dGVuZHMgRXZlbnRFbWl0dGVyXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R8b2JqZWN0W119IG9iamVjdCBvciBsaXN0IG9mIG9iamVjdHMgdG8gYW5pbWF0ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLndhaXQ9MF0gbiBtaWxsaXNlY29uZHMgYmVmb3JlIHN0YXJ0aW5nIGFuaW1hdGlvbiAoY2FuIGFsc28gYmUgdXNlZCB0byBwYXVzZSBhbmltYXRpb24gZm9yIGEgbGVuZ3RoIG9mIHRpbWUpXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnBhdXNlXSBzdGFydCB0aGUgYW5pbWF0aW9uIHBhdXNlZFxyXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXBlYXRdIHRydWU6IHJlcGVhdCBhbmltYXRpb24gZm9yZXZlciBuOiByZXBlYXQgYW5pbWF0aW9uIG4gdGltZXNcclxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMucmV2ZXJzZV0gdHJ1ZTogcmV2ZXJzZSBhbmltYXRpb24gKGlmIGNvbWJpbmVkIHdpdGggcmVwZWF0LCB0aGVuIHB1bHNlKSBuOiByZXZlcnNlIGFuaW1hdGlvbiBuIHRpbWVzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmlkXSB1c2VyLWdlbmVyYXRlZCBpZCAoZS5nLiwgSSB1c2UgaXQgdG8gcHJvcGVybHkgbG9hZCBhbmltYXRpb25zIHdoZW4gYW4gb2JqZWN0IGhhcyBtdWx0aXBsZSBhbmltYXRpb25zIHJ1bm5pbmcpXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkXSBsb2FkcyBhbiBhbmltYXRpb24gdXNpbmcgYW4gLnNhdmUoKSBvYmplY3Qgbm90ZSB0aGUgKiBwYXJhbWV0ZXJzIGJlbG93IGNhbm5vdCBiZSBsb2FkZWQgYW5kIG11c3QgYmUgcmUtc2V0XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufHN0cmluZ30gW29wdGlvbnMuZWFzZV0gZnVuY3Rpb24gKG9yIHBlbm5lciBmdW5jdGlvbiBuYW1lKSBmcm9tIGVhc2luZy5qcyAoc2VlIGh0dHA6Ly9lYXNpbmdzLm5ldCBmb3IgZXhhbXBsZXMpKlxyXG4gICAgICpcclxuICAgICAqIEBlbWl0cyB7ZG9uZX0gYW5pbWF0aW9uIGV4cGlyZXNcclxuICAgICAqIEBlbWl0cyB7d2FpdH0gZWFjaCB1cGRhdGUgZHVyaW5nIGEgd2FpdFxyXG4gICAgICogQGVtaXRzIHtmaXJzdH0gZmlyc3QgdXBkYXRlIHdoZW4gYW5pbWF0aW9uIHN0YXJ0c1xyXG4gICAgICogQGVtaXRzIHtlYWNofSBlYWNoIHVwZGF0ZSB3aGlsZSBhbmltYXRpb24gaXMgcnVubmluZ1xyXG4gICAgICogQGVtaXRzIHtsb29wfSB3aGVuIGFuaW1hdGlvbiBpcyByZXBlYXRlZFxyXG4gICAgICogQGVtaXRzIHtyZXZlcnNlfSB3aGVuIGFuaW1hdGlvbiBpcyByZXZlcnNlZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QsIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gICAgICAgIHRoaXMudHlwZSA9ICdXYWl0J1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubG9hZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZCh0aGlzLm9wdGlvbnMubG9hZClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVhc2UgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy5lYXNlICE9PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVhc2VOYW1lID0gdGhpcy5vcHRpb25zLmVhc2VcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVhc2UgPSBFYXNpbmdbdGhpcy5vcHRpb25zLmVhc2VdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmVhc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZSA9IEVhc2luZ1snbGluZWFyJ11cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc2F2ZSA9IHsgdHlwZTogdGhpcy50eXBlLCB0aW1lOiB0aGlzLnRpbWUsIGR1cmF0aW9uOiB0aGlzLmR1cmF0aW9uLCBlYXNlOiB0aGlzLm9wdGlvbnMuZWFzZU5hbWUgfVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICBpZiAob3B0aW9ucy53YWl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2F2ZS53YWl0ID0gb3B0aW9ucy53YWl0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5pZCAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYXZlLmlkID0gb3B0aW9ucy5pZFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5wYXVzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhdmUucGF1c2UgPSBvcHRpb25zLnBhdXNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnJlcGVhdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhdmUucmVwZWF0ID0gb3B0aW9ucy5yZXBlYXRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhdmUucmV2ZXJzZSA9IG9wdGlvbnMucmV2ZXJzZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2F2ZVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWQobG9hZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMud2FpdCA9IGxvYWQud2FpdFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wYXVzZSA9IGxvYWQucGF1c2VcclxuICAgICAgICB0aGlzLm9wdGlvbnMucmVwZWF0ID0gbG9hZC5yZXBlYXRcclxuICAgICAgICB0aGlzLm9wdGlvbnMucmV2ZXJzZSA9IGxvYWQucmV2ZXJzZVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5pZCA9IGxvYWQuaWRcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZSA9IGxvYWQuZWFzZVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZWFzZSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLmVhc2UgIT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZU5hbWUgPSB0aGlzLm9wdGlvbnMuZWFzZVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZSA9IEVhc2luZ1t0aGlzLm9wdGlvbnMuZWFzZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZWFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gRWFzaW5nWydsaW5lYXInXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWUgPSBsb2FkLnRpbWVcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gbG9hZC5kdXJhdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGF1c2UgdGhpcyBlbnRyeVxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHNldCBwYXVzZSh2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGF1c2UgPSB2YWx1ZVxyXG4gICAgfVxyXG4gICAgZ2V0IHBhdXNlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhdXNlXHJcbiAgICB9XHJcblxyXG4gICAgZW5kKGxlZnRPdmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmV2ZXJzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmV2ZXJzZSgpXHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IGxlZnRPdmVyXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlcGVhdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZXZlcnNlID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXZlcnNlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucmV2ZXJzZS0tXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVwZWF0LS1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnLCB0aGlzLmxpc3QgfHwgdGhpcy5vYmplY3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy5yZXBlYXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBsZWZ0T3ZlclxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlcGVhdCAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wJywgdGhpcy5saXN0IHx8IHRoaXMub2JqZWN0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCB0aGlzLmxpc3QgfHwgdGhpcy5vYmplY3QsIGxlZnRPdmVyKVxyXG4gICAgICAgICAgICAvLyB0aGlzLmxpc3QgPSB0aGlzLm9iamVjdCA9IG51bGxcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBhdXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLndhaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvcHRpb25zLndhaXQgLT0gZWxhcHNlZFxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy53YWl0IDw9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVsYXBzZWQgPSAtb3B0aW9ucy53YWl0XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLndhaXQgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd3YWl0JywgZWxhcHNlZCwgdGhpcy5saXN0IHx8IHRoaXMub2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmZpcnN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5maXJzdCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdmaXJzdCcsIHRoaXMubGlzdCB8fCB0aGlzLm9iamVjdClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lICs9IGVsYXBzZWRcclxuICAgICAgICBsZXQgbGVmdE92ZXIgPSAwXHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uXHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnRpbWVcclxuICAgICAgICBpZiAoZHVyYXRpb24gIT09IDAgJiYgdGltZSA+IGR1cmF0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGVmdE92ZXIgPSB0aW1lIC0gZHVyYXRpb25cclxuICAgICAgICAgICAgdGhpcy50aW1lID0gdGltZSA9IGR1cmF0aW9uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZvcmNlID0gdGhpcy5jYWxjdWxhdGUoZWxhcHNlZClcclxuICAgICAgICB0aGlzLmVtaXQoJ2VhY2gnLCBlbGFwc2VkLCB0aGlzLmxpc3QgfHwgdGhpcy5vYmplY3QsIHRoaXMpXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ1dhaXQnIHx8IChkdXJhdGlvbiAhPT0gMCAmJiB0aW1lID09PSBkdXJhdGlvbikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmQobGVmdE92ZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JjZSB8fCB0aW1lID09PSBkdXJhdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvcnJlY3QgY2VydGFpbiBET00gdmFsdWVzXHJcbiAgICBfY29ycmVjdERPTShrZXksIHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAnb3BhY2l0eSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGlzTmFOKHZhbHVlKSkgPyAxIDogdmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpIHt9XHJcbiAgICBjYWxjdWxhdGUoKSB7IH1cclxuICAgIGRvbmUoKSB7IH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3YWl0Il19