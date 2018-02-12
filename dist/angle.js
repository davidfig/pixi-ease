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
     * @private
     * animate object's {x, y} using an angle
     * @param {object} object to animate
     * @param {number} angle in radians
     * @param {number} speed in pixels/millisecond
     * @param {number} [duration=0] in milliseconds; if 0, then continues forever
     * @param {object} [options] @see {@link Wait}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmdsZS5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsImFuZ2xlIiwib2JqZWN0Iiwic3BlZWQiLCJkdXJhdGlvbiIsIm9wdGlvbnMiLCJ0eXBlIiwibG9hZCIsInNhdmUiLCJlbGFwc2VkIiwieCIsImNvcyIsInkiLCJzaW4iLCJNYXRoIiwiUEkiLCJfYW5nbGUiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLE9BQU9DLFFBQVEsUUFBUixDQUFiOztJQUVNQyxLOzs7QUFFRjs7Ozs7Ozs7O0FBU0EsbUJBQVlDLE1BQVosRUFBb0JELE1BQXBCLEVBQTJCRSxLQUEzQixFQUFrQ0MsUUFBbEMsRUFBNENDLE9BQTVDLEVBQ0E7QUFBQTs7QUFDSUEsa0JBQVVBLFdBQVcsRUFBckI7O0FBREosa0hBRVVILE1BRlYsRUFFa0JHLE9BRmxCOztBQUdJLGNBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsWUFBSUQsUUFBUUUsSUFBWixFQUNBO0FBQ0ksa0JBQUtBLElBQUwsQ0FBVUYsUUFBUUUsSUFBbEI7QUFDSCxTQUhELE1BS0E7QUFDSSxrQkFBS04sS0FBTCxHQUFhQSxNQUFiO0FBQ0Esa0JBQUtFLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGtCQUFLQyxRQUFMLEdBQWdCQSxZQUFZLENBQTVCO0FBQ0g7QUFiTDtBQWNDOzs7OytCQUdEO0FBQ0ksZ0JBQU1JLHlHQUFOO0FBQ0FBLGlCQUFLUCxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQU8saUJBQUtMLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBLG1CQUFPSyxJQUFQO0FBQ0g7Ozs2QkFFSUQsSyxFQUNMO0FBQ0ksK0dBQVdBLEtBQVg7QUFDQSxpQkFBS04sS0FBTCxHQUFhTSxNQUFLTixLQUFsQjtBQUNBLGlCQUFLRSxLQUFMLEdBQWFJLE1BQUtKLEtBQWxCO0FBQ0g7OztrQ0FhU00sTyxFQUNWO0FBQ0ksaUJBQUtQLE1BQUwsQ0FBWVEsQ0FBWixJQUFpQixLQUFLQyxHQUFMLEdBQVdGLE9BQVgsR0FBcUIsS0FBS04sS0FBM0M7QUFDQSxpQkFBS0QsTUFBTCxDQUFZVSxDQUFaLElBQWlCLEtBQUtDLEdBQUwsR0FBV0osT0FBWCxHQUFxQixLQUFLTixLQUEzQztBQUNIOzs7a0NBR0Q7QUFDSSxpQkFBS0YsS0FBTCxJQUFjYSxLQUFLQyxFQUFuQjtBQUNIOzs7NEJBbkJEO0FBQ0ksbUJBQU8sS0FBS0MsTUFBWjtBQUNILFM7MEJBQ1NDLEssRUFDVjtBQUNJLGlCQUFLRCxNQUFMLEdBQWNDLEtBQWQ7QUFDQSxpQkFBS0osR0FBTCxHQUFXQyxLQUFLRCxHQUFMLENBQVMsS0FBS0csTUFBZCxDQUFYO0FBQ0EsaUJBQUtMLEdBQUwsR0FBV0csS0FBS0gsR0FBTCxDQUFTLEtBQUtLLE1BQWQsQ0FBWDtBQUNIOzs7O0VBcERlakIsSTs7QUFrRXBCbUIsT0FBT0MsT0FBUCxHQUFpQmxCLEtBQWpCIiwiZmlsZSI6ImFuZ2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2FpdCA9IHJlcXVpcmUoJy4vd2FpdCcpXG5cbmNsYXNzIGFuZ2xlIGV4dGVuZHMgd2FpdFxue1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogYW5pbWF0ZSBvYmplY3QncyB7eCwgeX0gdXNpbmcgYW4gYW5nbGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgaW4gcmFkaWFuc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCBpbiBwaXhlbHMvbWlsbGlzZWNvbmRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTBdIGluIG1pbGxpc2Vjb25kczsgaWYgMCwgdGhlbiBjb250aW51ZXMgZm9yZXZlclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gQHNlZSB7QGxpbmsgV2FpdH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QsIGFuZ2xlLCBzcGVlZCwgZHVyYXRpb24sIG9wdGlvbnMpXG4gICAge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpXG4gICAgICAgIHRoaXMudHlwZSA9ICdBbmdsZSdcbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkKG9wdGlvbnMubG9hZClcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkXG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb24gfHwgMFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBzYXZlID0gc3VwZXIuc2F2ZSgpXG4gICAgICAgIHNhdmUuYW5nbGUgPSB0aGlzLmFuZ2xlXG4gICAgICAgIHNhdmUuc3BlZWQgPSB0aGlzLnNwZWVkXG4gICAgICAgIHJldHVybiBzYXZlXG4gICAgfVxuXG4gICAgbG9hZChsb2FkKVxuICAgIHtcbiAgICAgICAgc3VwZXIubG9hZChsb2FkKVxuICAgICAgICB0aGlzLmFuZ2xlID0gbG9hZC5hbmdsZVxuICAgICAgICB0aGlzLnNwZWVkID0gbG9hZC5zcGVlZFxuICAgIH1cblxuICAgIGdldCBhbmdsZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5nbGVcbiAgICB9XG4gICAgc2V0IGFuZ2xlKHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSB2YWx1ZVxuICAgICAgICB0aGlzLnNpbiA9IE1hdGguc2luKHRoaXMuX2FuZ2xlKVxuICAgICAgICB0aGlzLmNvcyA9IE1hdGguY29zKHRoaXMuX2FuZ2xlKVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZShlbGFwc2VkKVxuICAgIHtcbiAgICAgICAgdGhpcy5vYmplY3QueCArPSB0aGlzLmNvcyAqIGVsYXBzZWQgKiB0aGlzLnNwZWVkXG4gICAgICAgIHRoaXMub2JqZWN0LnkgKz0gdGhpcy5zaW4gKiBlbGFwc2VkICogdGhpcy5zcGVlZFxuICAgIH1cblxuICAgIHJldmVyc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5hbmdsZSArPSBNYXRoLlBJXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ2xlIl19