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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb3ZpZS5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsIm1vdmllIiwib2JqZWN0IiwidGV4dHVyZXMiLCJkdXJhdGlvbiIsIm9wdGlvbnMiLCJ0eXBlIiwiQXJyYXkiLCJpc0FycmF5IiwibGlzdCIsImxvYWQiLCJjdXJyZW50IiwibGVuZ3RoIiwiaW50ZXJ2YWwiLCJpc1JldmVyc2UiLCJyZXN0YXJ0Iiwic2F2ZSIsImdvdG8iLCJ0aW1lIiwiaW5kZXgiLCJNYXRoIiwicm91bmQiLCJlYXNlIiwiaSIsInRleHR1cmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQTs7OztJQUdNQyxLOzs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxtQkFBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLEVBQXdDQyxPQUF4QyxFQUNBO0FBQUE7O0FBQ0lBLGtCQUFVQSxXQUFXLEVBQXJCOztBQURKLGtIQUVVSCxNQUZWLEVBRWtCRyxPQUZsQjs7QUFHSSxjQUFLQyxJQUFMLEdBQVksT0FBWjtBQUNBLFlBQUlDLE1BQU1DLE9BQU4sQ0FBY04sTUFBZCxDQUFKLEVBQ0E7QUFDSSxrQkFBS08sSUFBTCxHQUFZUCxNQUFaO0FBQ0Esa0JBQUtBLE1BQUwsR0FBYyxNQUFLTyxJQUFMLENBQVUsQ0FBVixDQUFkO0FBQ0g7QUFDRCxZQUFJSixRQUFRSyxJQUFaLEVBQ0E7QUFDSSxrQkFBS0EsSUFBTCxDQUFVTCxRQUFRSyxJQUFsQjtBQUNILFNBSEQsTUFLQTtBQUNJLGtCQUFLUCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGtCQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGtCQUFLTyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGtCQUFLQyxNQUFMLEdBQWNULFNBQVNTLE1BQXZCO0FBQ0Esa0JBQUtDLFFBQUwsR0FBZ0JULFdBQVcsTUFBS1EsTUFBaEM7QUFDQSxrQkFBS0UsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGtCQUFLQyxPQUFMO0FBQ0g7QUF0Qkw7QUF1QkM7Ozs7K0JBR0Q7QUFDSSxnQkFBTUMseUdBQU47QUFDQUEsaUJBQUtDLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNBRCxpQkFBS0wsT0FBTCxHQUFlLEtBQUtBLE9BQXBCO0FBQ0FLLGlCQUFLSixNQUFMLEdBQWMsS0FBS0EsTUFBbkI7QUFDQUksaUJBQUtILFFBQUwsR0FBZ0IsS0FBS0EsUUFBckI7QUFDQSxtQkFBT0csSUFBUDtBQUNIOzs7NkJBRUlOLEssRUFDTDtBQUNJLCtHQUFXQSxLQUFYO0FBQ0EsaUJBQUtPLElBQUwsR0FBWVAsTUFBS08sSUFBakI7QUFDQSxpQkFBS04sT0FBTCxHQUFlRCxNQUFLQyxPQUFwQjtBQUNBLGlCQUFLRSxRQUFMLEdBQWdCSCxNQUFLQyxPQUFyQjtBQUNIOzs7a0NBR0Q7QUFDSSxpQkFBS0EsT0FBTCxHQUFlLENBQWY7QUFDQSxpQkFBS08sSUFBTCxHQUFZLENBQVo7QUFDQSxpQkFBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNIOzs7a0NBR0Q7QUFDSSxpQkFBS0EsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCO0FBQ0g7OztvQ0FHRDtBQUNJLGdCQUFJSyxRQUFRQyxLQUFLQyxLQUFMLENBQVcsS0FBS2hCLE9BQUwsQ0FBYWlCLElBQWIsQ0FBa0IsS0FBS0osSUFBdkIsRUFBNkIsQ0FBN0IsRUFBZ0MsS0FBS04sTUFBTCxHQUFjLENBQTlDLEVBQWlELEtBQUtSLFFBQXRELENBQVgsQ0FBWjtBQUNBLGdCQUFJLEtBQUtVLFNBQVQsRUFDQTtBQUNJSyx3QkFBUSxLQUFLUCxNQUFMLEdBQWMsQ0FBZCxHQUFrQk8sS0FBMUI7QUFDSDtBQUNELGdCQUFJLEtBQUtWLElBQVQsRUFDQTtBQUNJLHFCQUFLLElBQUljLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLZCxJQUFMLENBQVVHLE1BQTlCLEVBQXNDVyxHQUF0QyxFQUNBO0FBQ0kseUJBQUtkLElBQUwsQ0FBVWMsQ0FBVixFQUFhQyxPQUFiLEdBQXVCLEtBQUtyQixRQUFMLENBQWNnQixLQUFkLENBQXZCO0FBQ0g7QUFDSixhQU5ELE1BUUE7QUFDSSxxQkFBS2pCLE1BQUwsQ0FBWXNCLE9BQVosR0FBc0IsS0FBS3JCLFFBQUwsQ0FBY2dCLEtBQWQsQ0FBdEI7QUFDSDtBQUNKOzs7O0VBL0ZlcEIsSTs7QUFrR3BCMEIsT0FBT0MsT0FBUCxHQUFpQnpCLEtBQWpCIiwiZmlsZSI6Im1vdmllLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2FpdCA9IHJlcXVpcmUoJy4vd2FpdCcpXG5cbi8qKlxuICogYW5pbWF0ZSBhIG1vdmllIG9mIHRleHR1cmVzXG4gKi9cbmNsYXNzIG1vdmllIGV4dGVuZHMgd2FpdFxue1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgdG8gYW5pbWF0ZVxuICAgICAqIEBwYXJhbSB7UElYSS5UZXh0dXJlW119IHRleHR1cmVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtkdXJhdGlvbj0wXSB0aW1lIHRvIHJ1biAodXNlIDAgZm9yIGluZmluaXRlIGR1cmF0aW9uLS1zaG91bGQgb25seSBiZSB1c2VkIHdpdGggY3VzdG9taXplZCBlYXNpbmcgZnVuY3Rpb25zKVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMud2FpdD0wXSBuIG1pbGxpc2Vjb25kcyBiZWZvcmUgc3RhcnRpbmcgYW5pbWF0aW9uIChjYW4gYWxzbyBiZSB1c2VkIHRvIHBhdXNlIGFuaW1hdGlvbiBmb3IgYSBsZW5ndGggb2YgdGltZSlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnBhdXNlXSBzdGFydCB0aGUgYW5pbWF0aW9uIHBhdXNlZFxuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMucmVwZWF0XSB0cnVlOiByZXBlYXQgYW5pbWF0aW9uIGZvcmV2ZXIgbjogcmVwZWF0IGFuaW1hdGlvbiBuIHRpbWVzXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXZlcnNlXSB0cnVlOiByZXZlcnNlIGFuaW1hdGlvbiAoaWYgY29tYmluZWQgd2l0aCByZXBlYXQsIHRoZW4gcHVsc2UpIG46IHJldmVyc2UgYW5pbWF0aW9uIG4gdGltZXNcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLmNvbnRpbnVlXSB0cnVlOiBjb250aW51ZSBhbmltYXRpb24gd2l0aCBuZXcgc3RhcnRpbmcgdmFsdWVzIG46IGNvbnRpbnVlIGFuaW1hdGlvbiBuIHRpbWVzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMubG9hZF0gbG9hZHMgYW4gYW5pbWF0aW9uIHVzaW5nIGEgLnNhdmUoKSBvYmplY3Qgbm90ZSB0aGUgKiBwYXJhbWV0ZXJzIGJlbG93IGNhbm5vdCBiZSBsb2FkZWQgYW5kIG11c3QgYmUgcmUtc2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZWFzZV0gZnVuY3Rpb24gZnJvbSBlYXNpbmcuanMgKHNlZSBodHRwOi8vZWFzaW5ncy5uZXQgZm9yIGV4YW1wbGVzKVxuICAgICAqIEBlbWl0cyB7ZG9uZX0gYW5pbWF0aW9uIGV4cGlyZXNcbiAgICAgKiBAZW1pdHMge3dhaXR9IGVhY2ggdXBkYXRlIGR1cmluZyBhIHdhaXRcbiAgICAgKiBAZW1pdHMge2ZpcnN0fSBmaXJzdCB1cGRhdGUgd2hlbiBhbmltYXRpb24gc3RhcnRzXG4gICAgICogQGVtaXRzIHtlYWNofSBlYWNoIHVwZGF0ZSB3aGlsZSBhbmltYXRpb24gaXMgcnVubmluZ1xuICAgICAqIEBlbWl0cyB7bG9vcH0gd2hlbiBhbmltYXRpb24gaXMgcmVwZWF0ZWRcbiAgICAgKiBAZW1pdHMge3JldmVyc2V9IHdoZW4gYW5pbWF0aW9uIGlzIHJldmVyc2VkXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2JqZWN0LCB0ZXh0dXJlcywgZHVyYXRpb24sIG9wdGlvbnMpXG4gICAge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpXG4gICAgICAgIHRoaXMudHlwZSA9ICdNb3ZpZSdcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gb2JqZWN0XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IHRoaXMubGlzdFswXVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmxvYWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9hZChvcHRpb25zLmxvYWQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmVzID0gdGV4dHVyZXNcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gMFxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSB0ZXh0dXJlcy5sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBkdXJhdGlvbiAvIHRoaXMubGVuZ3RoXG4gICAgICAgICAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLnJlc3RhcnQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBzYXZlID0gc3VwZXIuc2F2ZSgpXG4gICAgICAgIHNhdmUuZ290byA9IHRoaXMuZ290b1xuICAgICAgICBzYXZlLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnRcbiAgICAgICAgc2F2ZS5sZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgICAgICBzYXZlLmludGVydmFsID0gdGhpcy5pbnRlcnZhbFxuICAgICAgICByZXR1cm4gc2F2ZVxuICAgIH1cblxuICAgIGxvYWQobG9hZClcbiAgICB7XG4gICAgICAgIHN1cGVyLmxvYWQobG9hZClcbiAgICAgICAgdGhpcy5nb3RvID0gbG9hZC5nb3RvXG4gICAgICAgIHRoaXMuY3VycmVudCA9IGxvYWQuY3VycmVudFxuICAgICAgICB0aGlzLmludGVydmFsID0gbG9hZC5jdXJyZW50XG4gICAgfVxuXG4gICAgcmVzdGFydCgpXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICAgIHRoaXMudGltZSA9IDBcbiAgICAgICAgdGhpcy5pc1JldmVyc2UgPSBmYWxzZVxuICAgIH1cblxuICAgIHJldmVyc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pc1JldmVyc2UgPSAhdGhpcy5pc1JldmVyc2VcbiAgICB9XG5cbiAgICBjYWxjdWxhdGUoKVxuICAgIHtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5yb3VuZCh0aGlzLm9wdGlvbnMuZWFzZSh0aGlzLnRpbWUsIDAsIHRoaXMubGVuZ3RoIC0gMSwgdGhpcy5kdXJhdGlvbikpXG4gICAgICAgIGlmICh0aGlzLmlzUmV2ZXJzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmxlbmd0aCAtIDEgLSBpbmRleFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxpc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFtpXS50ZXh0dXJlID0gdGhpcy50ZXh0dXJlc1tpbmRleF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnRleHR1cmUgPSB0aGlzLnRleHR1cmVzW2luZGV4XVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdmllIl19