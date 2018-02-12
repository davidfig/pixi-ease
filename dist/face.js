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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mYWNlLmpzIl0sIm5hbWVzIjpbIkFuZ2xlIiwicmVxdWlyZSIsIndhaXQiLCJmYWNlIiwib2JqZWN0IiwidGFyZ2V0Iiwic3BlZWQiLCJvcHRpb25zIiwidHlwZSIsImxvYWQiLCJjYW5jZWwiLCJzYXZlIiwia2VlcEFsaXZlIiwiZWxhcHNlZCIsImFuZ2xlIiwiYW5nbGVUd29Qb2ludHMiLCJwb3NpdGlvbiIsImRpZmZlcmVuY2UiLCJkaWZmZXJlbmNlQW5nbGVzIiwicm90YXRpb24iLCJlbWl0Iiwic2lnbiIsImRpZmZlcmVuY2VBbmdsZXNTaWduIiwiY2hhbmdlIiwiZGVsdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRQyxRQUFRLFVBQVIsQ0FBZDtBQUNBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFiOztBQUVBOztJQUNNRSxJOzs7QUFFRjs7Ozs7OztBQU9BLGtCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsS0FBNUIsRUFBbUNDLE9BQW5DLEVBQ0E7QUFBQTs7QUFDSUEsa0JBQVVBLFdBQVcsRUFBckI7O0FBREosZ0hBRVVILE1BRlYsRUFFa0JHLE9BRmxCOztBQUdJLGNBQUtDLElBQUwsR0FBWSxNQUFaO0FBQ0EsY0FBS0gsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsWUFBSUUsUUFBUUUsSUFBWixFQUNBO0FBQ0ksa0JBQUtBLElBQUwsQ0FBVUYsUUFBUUUsSUFBbEI7QUFDSCxTQUhELE1BS0E7QUFDSSxrQkFBS0gsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7QUFaTDtBQWFDOzs7OytCQUdEO0FBQ0ksZ0JBQUksS0FBS0MsT0FBTCxDQUFhRyxNQUFqQixFQUNBO0FBQ0ksdUJBQU8sSUFBUDtBQUNIO0FBQ0QsZ0JBQU1DLHVHQUFOO0FBQ0FBLGlCQUFLTCxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQUssaUJBQUtDLFNBQUwsR0FBaUIsS0FBS0wsT0FBTCxDQUFhSyxTQUE5QjtBQUNBLG1CQUFPRCxJQUFQO0FBQ0g7Ozs2QkFFSUYsSyxFQUNMO0FBQ0ksNkdBQVdBLEtBQVg7QUFDQSxpQkFBS0gsS0FBTCxHQUFhRyxNQUFLSCxLQUFsQjtBQUNBLGlCQUFLQyxPQUFMLENBQWFLLFNBQWIsR0FBeUJILE1BQUtHLFNBQTlCO0FBQ0g7OztrQ0FFU0MsTyxFQUNWO0FBQ0ksZ0JBQUlDLFFBQVFkLE1BQU1lLGNBQU4sQ0FBcUIsS0FBS1gsTUFBTCxDQUFZWSxRQUFqQyxFQUEyQyxLQUFLWCxNQUFoRCxDQUFaO0FBQ0EsZ0JBQUlZLGFBQWFqQixNQUFNa0IsZ0JBQU4sQ0FBdUJKLEtBQXZCLEVBQThCLEtBQUtWLE1BQUwsQ0FBWWUsUUFBMUMsQ0FBakI7QUFDQSxnQkFBSUYsZUFBZSxDQUFuQixFQUNBO0FBQ0kscUJBQUtHLElBQUwsQ0FBVSxNQUFWLEVBQWtCLEtBQUtoQixNQUF2QjtBQUNBLG9CQUFJLENBQUMsS0FBS0csT0FBTCxDQUFhSyxTQUFsQixFQUNBO0FBQ0ksMkJBQU8sSUFBUDtBQUNIO0FBQ0osYUFQRCxNQVNBO0FBQ0ksb0JBQUlTLE9BQU9yQixNQUFNc0Isb0JBQU4sQ0FBMkJSLEtBQTNCLEVBQWtDLEtBQUtWLE1BQUwsQ0FBWWUsUUFBOUMsQ0FBWDtBQUNBLG9CQUFJSSxTQUFTLEtBQUtqQixLQUFMLEdBQWFPLE9BQTFCO0FBQ0Esb0JBQUlXLFFBQVNELFNBQVNOLFVBQVYsR0FBd0JBLFVBQXhCLEdBQXFDTSxNQUFqRDtBQUNBLHFCQUFLbkIsTUFBTCxDQUFZZSxRQUFaLElBQXdCSyxRQUFRSCxJQUFoQztBQUNIO0FBQ0o7Ozs7RUEvRGNuQixJOztBQWtFbkJ1QixPQUFPQyxPQUFQLEdBQWlCdkIsSUFBakIiLCJmaWxlIjoiZmFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFuZ2xlID0gcmVxdWlyZSgneXktYW5nbGUnKVxuY29uc3Qgd2FpdCA9IHJlcXVpcmUoJy4vd2FpdCcpXG5cbi8qKiBSb3RhdGVzIGFuIG9iamVjdCB0byBmYWNlIHRoZSB0YXJnZXQgKi9cbmNsYXNzIGZhY2UgZXh0ZW5kcyB3YWl0XG57XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCBpbiByYWRpYW5zL21pbGxpc2Vjb25kXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBAc2VlIHtAbGluayBXYWl0fVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMua2VlcEFsaXZlXSBkb24ndCBzdG9wIGFuaW1hdGlvbiB3aGVuIGNvbXBsZXRlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2JqZWN0LCB0YXJnZXQsIHNwZWVkLCBvcHRpb25zKVxuICAgIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICAgICAgc3VwZXIob2JqZWN0LCBvcHRpb25zKVxuICAgICAgICB0aGlzLnR5cGUgPSAnRmFjZSdcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXRcbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkKG9wdGlvbnMubG9hZClcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNhbmNlbClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzYXZlID0gc3VwZXIuc2F2ZSgpXG4gICAgICAgIHNhdmUuc3BlZWQgPSB0aGlzLnNwZWVkXG4gICAgICAgIHNhdmUua2VlcEFsaXZlID0gdGhpcy5vcHRpb25zLmtlZXBBbGl2ZVxuICAgICAgICByZXR1cm4gc2F2ZVxuICAgIH1cblxuICAgIGxvYWQobG9hZClcbiAgICB7XG4gICAgICAgIHN1cGVyLmxvYWQobG9hZClcbiAgICAgICAgdGhpcy5zcGVlZCA9IGxvYWQuc3BlZWRcbiAgICAgICAgdGhpcy5vcHRpb25zLmtlZXBBbGl2ZSA9IGxvYWQua2VlcEFsaXZlXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlKGVsYXBzZWQpXG4gICAge1xuICAgICAgICB2YXIgYW5nbGUgPSBBbmdsZS5hbmdsZVR3b1BvaW50cyh0aGlzLm9iamVjdC5wb3NpdGlvbiwgdGhpcy50YXJnZXQpXG4gICAgICAgIHZhciBkaWZmZXJlbmNlID0gQW5nbGUuZGlmZmVyZW5jZUFuZ2xlcyhhbmdsZSwgdGhpcy5vYmplY3Qucm90YXRpb24pXG4gICAgICAgIGlmIChkaWZmZXJlbmNlID09PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCB0aGlzLm9iamVjdClcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmtlZXBBbGl2ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHNpZ24gPSBBbmdsZS5kaWZmZXJlbmNlQW5nbGVzU2lnbihhbmdsZSwgdGhpcy5vYmplY3Qucm90YXRpb24pXG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gdGhpcy5zcGVlZCAqIGVsYXBzZWRcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IChjaGFuZ2UgPiBkaWZmZXJlbmNlKSA/IGRpZmZlcmVuY2UgOiBjaGFuZ2VcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnJvdGF0aW9uICs9IGRlbHRhICogc2lnblxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZhY2UiXX0=