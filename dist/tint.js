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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW50LmpzIl0sIm5hbWVzIjpbIkNvbG9yIiwicmVxdWlyZSIsIndhaXQiLCJ0aW50Iiwib2JqZWN0IiwiZHVyYXRpb24iLCJvcHRpb25zIiwidHlwZSIsIkFycmF5IiwiaXNBcnJheSIsImxpc3QiLCJsb2FkIiwidGludHMiLCJzdGFydCIsInRvIiwic2F2ZSIsInBlcmNlbnQiLCJlYXNlIiwidGltZSIsImVhY2giLCJsZW5ndGgiLCJwZXIiLCJpIiwiY29sb3IiLCJibGVuZCIsInB1c2giLCJzd2FwIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRQyxRQUFRLFVBQVIsQ0FBZDtBQUNBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFiOztJQUVNRSxJOzs7QUFFRjs7Ozs7O0FBTUEsa0JBQVlDLE1BQVosRUFBb0JELEtBQXBCLEVBQTBCRSxRQUExQixFQUFvQ0MsT0FBcEMsRUFDQTtBQUFBOztBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFESixnSEFFVUYsTUFGVixFQUVrQkUsT0FGbEI7O0FBR0ksY0FBS0MsSUFBTCxHQUFZLE1BQVo7QUFDQSxZQUFJQyxNQUFNQyxPQUFOLENBQWNMLE1BQWQsQ0FBSixFQUNBO0FBQ0ksa0JBQUtNLElBQUwsR0FBWU4sTUFBWjtBQUNBLGtCQUFLQSxNQUFMLEdBQWMsTUFBS00sSUFBTCxDQUFVLENBQVYsQ0FBZDtBQUNIO0FBQ0QsY0FBS0wsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxZQUFJQyxRQUFRSyxJQUFaLEVBQ0E7QUFDSSxrQkFBS0EsSUFBTCxDQUFVTCxRQUFRSyxJQUFsQjtBQUNILFNBSEQsTUFJSyxJQUFJSCxNQUFNQyxPQUFOLENBQWNOLEtBQWQsQ0FBSixFQUNMO0FBQ0ksa0JBQUtTLEtBQUwsSUFBYyxNQUFLUixNQUFMLENBQVlELElBQTFCLDRCQUFtQ0EsS0FBbkM7QUFDSCxTQUhJLE1BS0w7QUFDSSxrQkFBS1UsS0FBTCxH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O0VBL0djeEIsSTs7QUFrSG5CeUIsT0FBT0MsT0FBUCxHQUFpQnpCLElBQWpCIiwiZmlsZSI6InRpbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb2xvciA9IHJlcXVpcmUoJ3l5LWNvbG9yJylcbmNvbnN0IHdhaXQgPSByZXF1aXJlKCcuL3dhaXQnKVxuXG5jbGFzcyB0aW50IGV4dGVuZHMgd2FpdFxue1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UElYSS5EaXNwbGF5T2JqZWN0fFBJWEkuRGlzcGxheU9iamVjdFtdfSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gdGludFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb25dIGluIG1pbGxpc2Vjb25kc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gQHNlZSB7QGxpbmsgV2FpdH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QsIHRpbnQsIGR1cmF0aW9uLCBvcHRpb25zKVxuICAgIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICAgICAgc3VwZXIob2JqZWN0LCBvcHRpb25zKVxuICAgICAgICB0aGlzLnR5cGUgPSAnVGludCdcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gb2JqZWN0XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IHRoaXMubGlzdFswXVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvblxuICAgICAgICBpZiAob3B0aW9ucy5sb2FkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvYWQob3B0aW9ucy5sb2FkKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGludCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGludHMgPSBbdGhpcy5vYmplY3QudGludCwgLi4udGludF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLm9iamVjdC50aW50XG4gICAgICAgICAgICB0aGlzLnRvID0gdGludFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBzYXZlID0gc3VwZXIuc2F2ZSgpXG4gICAgICAgIHNhdmUuc3RhcnQgPSB0aGlzLnN0YXJ0XG4gICAgICAgIHNhdmUudG8gPSB0aGlzLnRvXG4gICAgICAgIHJldHVybiBzYXZlXG4gICAgfVxuXG4gICAgbG9hZChsb2FkKVxuICAgIHtcbiAgICAgICAgc3VwZXIubG9hZChsb2FkKVxuICAgICAgICB0aGlzLnN0YXJ0ID0gbG9hZC5zdGFydFxuICAgICAgICB0aGlzLnRvID0gbG9hZC50b1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBwZXJjZW50ID0gdGhpcy5vcHRpb25zLmVhc2UodGhpcy50aW1lLCAwLCAxLCB0aGlzLmR1cmF0aW9uKVxuICAgICAgICBpZiAodGhpcy50aW50cylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgZWFjaCA9IDEgLyAodGhpcy50aW50cy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgbGV0IHBlciA9IGVhY2hcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy50aW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAocGVyY2VudCA8PSBwZXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IENvbG9yLmJsZW5kKDEgLSAocGVyIC0gcGVyY2VudCkgLyBlYWNoLCB0aGlzLnRpbnRzW2kgLSAxXSwgdGhpcy50aW50c1tpXSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMubGlzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QudGludCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC50aW50ID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGVyICs9IGVhY2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gQ29sb3IuYmxlbmQocGVyY2VudCwgdGhpcy5zdGFydCwgdGhpcy50bylcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3QpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHRoaXMubGlzdClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC50aW50ID0gY29sb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QudGludCA9IGNvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXZlcnNlKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnRpbnRzKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB0aW50cyA9IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy50aW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aW50cy5wdXNoKHRoaXMudGludHNbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbnRzID0gdGludHNcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHN3YXAgPSB0aGlzLnRvXG4gICAgICAgICAgICB0aGlzLnRvID0gdGhpcy5zdGFydFxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHN3YXBcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aW50Il19