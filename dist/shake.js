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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zaGFrZS5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsInNoYWtlIiwib2JqZWN0IiwiYW1vdW50IiwiZHVyYXRpb24iLCJvcHRpb25zIiwidHlwZSIsIkFycmF5IiwiaXNBcnJheSIsImFycmF5IiwibGlzdCIsImxvYWQiLCJzdGFydCIsImkiLCJsZW5ndGgiLCJ0YXJnZXQiLCJ4IiwieSIsInNhdmUiLCJhY3R1YWwiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQTs7OztJQUdNQyxLOzs7QUFFRjs7Ozs7O0FBTUEsbUJBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxRQUE1QixFQUFzQ0MsT0FBdEMsRUFDQTtBQUFBOztBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFESixrSEFFVUgsTUFGVixFQUVrQkcsT0FGbEI7O0FBR0ksY0FBS0MsSUFBTCxHQUFZLE9BQVo7QUFDQSxZQUFJQyxNQUFNQyxPQUFOLENBQWNOLE1BQWQsQ0FBSixFQUNBO0FBQ0ksa0JBQUtPLEtBQUwsR0FBYSxJQUFiO0FBQ0Esa0JBQUtDLElBQUwsR0FBWVIsTUFBWjtBQUNIO0FBQ0QsWUFBSUcsUUFBUU0sSUFBWixFQUNBO0FBQ0ksa0JBQUtBLElBQUwsQ0FBVU4sUUFBUU0sSUFBbEI7QUFDSCxTQUhELE1BS0E7QUFDSSxnQkFBSSxNQUFLRCxJQUFULEVBQ0E7QUFDSSxzQkFBS0UsS0FBTCxHQUFhLEVBQWI7QUFDQSxxQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlYLE9BQU9ZLE1BQTNCLEVBQW1DRCxHQUFuQyxFQUNBO0FBQ0ksd0JBQU1FLFNBQVNiLE9BQU9XLENBQVAsQ0FBZjtBQUNBLDBCQUFLRCxLQUFMLENBQVdDLENBQVgsSUFBZ0IsRUFBQ0csR0FBR0QsT0FBT0MsQ0FBWCxFQUFjQyxHQUFHRixPQUFPRSxDQUF4QixFQUFoQjtBQUNIO0FBQ0osYUFSRCxNQVVBO0FBQ0ksc0JBQUtMLEtBQUwsR0FBYSxFQUFDSSxHQUFHZCxPQUFPYyxDQUFYLEVBQWNDLEdBQUdmLE9BQU9lLENBQXhCLEVBQWI7QUFDSDtBQUNELGtCQUFLZCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxrQkFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDSDtBQTlCTDtBQStCQzs7OzsrQkFHRDtBQUNJLGdCQUFNYyx5R0FBTjtBQUNBQSxpQkFBS04sS0FBTCxHQUFhLEtBQUtBLEtBQWxCO0FBQ0FNLGlCQUFLZixNQUFMLEdBQWMsS0FBS0EsTUFBbkI7QUFDQSxtQkFBT2UsSUFBUDtBQUNIOzs7NkJBRUlQLEssRUFDTDtBQUNJLCtHQUFXQSxLQUFYO0FBQ0EsaUJBQUtDLEtBQUwsR0FBYUQsTUFBS0MsS0FBbEI7QUFDQSxpQkFBS1QsTUFBTCxHQUFjUSxNQUFLUixNQUFuQjtBQUNIOzs7b0NBRVMsV0FDVjtBQUNJLGdCQUFNRCxTQUFTLEtBQUtBLE1BQXBCO0FBQ0EsZ0JBQU1VLFFBQVEsS0FBS0EsS0FBbkI7QUFDQSxnQkFBTVQsU0FBUyxLQUFLQSxNQUFwQjtBQUNBLGdCQUFJLEtBQUtNLEtBQVQsRUFDQTtBQUNJLG9CQUFNQyxPQUFPLEtBQUtBLElBQWxCO0FBQ0EscUJBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxLQUFLSSxNQUF6QixFQUFpQ0QsR0FBakMsRUFDQTtBQUNJLHdCQUFNWCxVQUFTUSxLQUFLRyxDQUFMLENBQWY7QUFDQSx3QkFBTU0sU0FBU1AsTUFBTUMsQ0FBTixDQUFmO0FBQ0FYLDRCQUFPYyxDQUFQLEdBQVdHLE9BQU9ILENBQVAsR0FBV0ksS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCbkIsTUFBaEIsR0FBeUIsQ0FBcEMsQ0FBWCxHQUFvREEsTUFBL0Q7QUFDQUQsNEJBQU9lLENBQVAsR0FBV0UsT0FBT0YsQ0FBUCxHQUFXRyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JuQixNQUFoQixHQUF5QixDQUFwQyxDQUFYLEdBQW9EQSxNQUEvRDtBQUNIO0FBQ0o7QUFDREQsbUJBQU9jLENBQVAsR0FBV0osTUFBTUksQ0FBTixHQUFVSSxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsS0FBZ0JuQixNQUFoQixHQUF5QixDQUFwQyxDQUFWLEdBQW1EQSxNQUE5RDtBQUNBRCxtQkFBT2UsQ0FBUCxHQUFXTCxNQUFNSyxDQUFOLEdBQVVHLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQm5CLE1BQWhCLEdBQXlCLENBQXBDLENBQVYsR0FBbURBLE1BQTlEO0FBQ0g7OzsrQkFHRDtBQUNJLGdCQUFNRCxTQUFTLEtBQUtBLE1BQXBCO0FBQ0EsZ0JBQU1VLFFBQVEsS0FBS0EsS0FBbkI7QUFDQSxnQkFBSSxLQUFLSCxLQUFULEVBQ0E7QUFDSSxvQkFBTUMsT0FBTyxLQUFLQSxJQUFsQjtBQUNBLHFCQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsS0FBS0ksTUFBekIsRUFBaUNELEdBQWpDLEVBQ0E7QUFDSSx3QkFBTVgsV0FBU1EsS0FBS0csQ0FBTCxDQUFmO0FBQ0Esd0JBQU1NLFNBQVNQLE1BQU1DLENBQU4sQ0FBZjtBQUNBWCw2QkFBT2MsQ0FBUCxHQUFXRyxPQUFPSCxDQUFsQjtBQUNBZCw2QkFBT2UsQ0FBUCxHQUFXRSxPQUFPRixDQUFsQjtBQUNIO0FBQ0osYUFWRCxNQVlBO0FBQ0lmLHVCQUFPYyxDQUFQLEdBQVdKLE1BQU1JLENBQWpCO0FBQ0FkLHVCQUFPZSxDQUFQLEdBQVdMLE1BQU1LLENBQWpCO0FBQ0g7QUFDSjs7OztFQWpHZWxCLEk7O0FBb0dwQndCLE9BQU9DLE9BQVAsR0FBaUJ2QixLQUFqQiIsImZpbGUiOiJzaGFrZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHdhaXQgPSByZXF1aXJlKCcuL3dhaXQnKVxuXG4vKipcbiAqIHNoYWtlcyBhbiBvYmplY3Qgb3IgbGlzdCBvZiBvYmplY3RzXG4gKi9cbmNsYXNzIHNoYWtlIGV4dGVuZHMgd2FpdFxue1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSBvYmplY3Qgb3IgbGlzdCBvZiBvYmplY3RzIHRvIHNoYWtlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCB0byBzaGFrZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiAoaW4gbWlsbGlzZWNvbmRzKSB0byBzaGFrZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIChzZWUgQW5pbWF0ZS53YWl0KVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCwgYW1vdW50LCBkdXJhdGlvbiwgb3B0aW9ucylcbiAgICB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgICAgIHN1cGVyKG9iamVjdCwgb3B0aW9ucylcbiAgICAgICAgdGhpcy50eXBlID0gJ1NoYWtlJ1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFycmF5ID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5saXN0ID0gb2JqZWN0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkKG9wdGlvbnMubG9hZClcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3QpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBvYmplY3RbaV1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFtpXSA9IHt4OiB0YXJnZXQueCwgeTogdGFyZ2V0Lnl9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSB7eDogb2JqZWN0LngsIHk6IG9iamVjdC55fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnRcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBzYXZlID0gc3VwZXIuc2F2ZSgpXG4gICAgICAgIHNhdmUuc3RhcnQgPSB0aGlzLnN0YXJ0XG4gICAgICAgIHNhdmUuYW1vdW50ID0gdGhpcy5hbW91bnRcbiAgICAgICAgcmV0dXJuIHNhdmVcbiAgICB9XG5cbiAgICBsb2FkKGxvYWQpXG4gICAge1xuICAgICAgICBzdXBlci5sb2FkKGxvYWQpXG4gICAgICAgIHRoaXMuc3RhcnQgPSBsb2FkLnN0YXJ0XG4gICAgICAgIHRoaXMuYW1vdW50ID0gbG9hZC5hbW91bnRcbiAgICB9XG5cbiAgICBjYWxjdWxhdGUoLyplbGFwc2VkKi8pXG4gICAge1xuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLm9iamVjdFxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnRcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5hbW91bnRcbiAgICAgICAgaWYgKHRoaXMuYXJyYXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmplY3QgPSBsaXN0W2ldXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gc3RhcnRbaV1cbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IGFjdHVhbC54ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW1vdW50ICogMikgLSBhbW91bnRcbiAgICAgICAgICAgICAgICBvYmplY3QueSA9IGFjdHVhbC55ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW1vdW50ICogMikgLSBhbW91bnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvYmplY3QueCA9IHN0YXJ0LnggKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbW91bnQgKiAyKSAtIGFtb3VudFxuICAgICAgICBvYmplY3QueSA9IHN0YXJ0LnkgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhbW91bnQgKiAyKSAtIGFtb3VudFxuICAgIH1cblxuICAgIGRvbmUoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5vYmplY3RcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLnN0YXJ0XG4gICAgICAgIGlmICh0aGlzLmFycmF5KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqZWN0ID0gbGlzdFtpXVxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IHN0YXJ0W2ldXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSBhY3R1YWwueFxuICAgICAgICAgICAgICAgIG9iamVjdC55ID0gYWN0dWFsLnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9iamVjdC54ID0gc3RhcnQueFxuICAgICAgICAgICAgb2JqZWN0LnkgPSBzdGFydC55XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hha2UiXX0=