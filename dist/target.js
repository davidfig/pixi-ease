'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

/** move an object to a target's location */

var target = function (_wait) {
    _inherits(target, _wait);

    /**
     * move to a target
     * @param {object} object - object to animate
     * @param {object} target - object needs to contain {x: x, y: y}
     * @param {number} speed - number of pixels to move per millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't cancel the animation when target is reached
     */
    function target(object, _target, speed, options) {
        _classCallCheck(this, target);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (target.__proto__ || Object.getPrototypeOf(target)).call(this, object, options));

        _this.type = 'Target';
        _this.target = _target;
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.speed = speed;
        }
        return _this;
    }

    _createClass(target, [{
        key: 'save',
        value: function save() {
            var save = _get(target.prototype.__proto__ || Object.getPrototypeOf(target.prototype), 'save', this).call(this);
            save.speed = this.speed;
            save.keepAlive = this.options.keepAlive;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(target.prototype.__proto__ || Object.getPrototypeOf(target.prototype), 'load', this).call(this, _load);
            this.speed = _load.speed;
            this.options.keepAlive = _load.keepAlive;
        }
    }, {
        key: 'calculate',
        value: function calculate(elapsed) {
            var deltaX = this.target.x - this.object.x;
            var deltaY = this.target.y - this.object.y;
            if (deltaX === 0 && deltaY === 0) {
                this.emit('done', this.object);
                if (!this.options.keepAlive) {
                    return true;
                }
            } else {
                var angle = Math.atan2(deltaY, deltaX);
                this.object.x += Math.cos(angle) * elapsed * this.speed;
                this.object.y += Math.sin(angle) * elapsed * this.speed;
                if (deltaX >= 0 !== this.target.x - this.object.x >= 0) {
                    this.object.x = this.target.x;
                }
                if (deltaY >= 0 !== this.target.y - this.object.y >= 0) {
                    this.object.y = this.target.y;
                }
            }
        }
    }]);

    return target;
}(wait);

module.exports = target;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90YXJnZXQuanMiXSwibmFtZXMiOlsid2FpdCIsInJlcXVpcmUiLCJ0YXJnZXQiLCJvYmplY3QiLCJzcGVlZCIsIm9wdGlvbnMiLCJ0eXBlIiwibG9hZCIsInNhdmUiLCJrZWVwQWxpdmUiLCJlbGFwc2VkIiwiZGVsdGFYIiwieCIsImRlbHRhWSIsInkiLCJlbWl0IiwiYW5nbGUiLCJNYXRoIiwiYXRhbjIiLCJjb3MiLCJzaW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQTs7SUFDTUMsTTs7O0FBRUY7Ozs7Ozs7O0FBUUEsb0JBQVlDLE1BQVosRUFBb0JELE9BQXBCLEVBQTRCRSxLQUE1QixFQUFtQ0MsT0FBbkMsRUFDQTtBQUFBOztBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFESixvSEFFVUYsTUFGVixFQUVrQkUsT0FGbEI7O0FBR0ksY0FBS0MsSUFBTCxHQUFZLFFBQVo7QUFDQSxjQUFLSixNQUFMLEdBQWNBLE9BQWQ7QUFDQSxZQUFJRyxRQUFRRSxJQUFaLEVBQ0E7QUFDSSxrQkFBS0EsSUFBTCxDQUFVRixRQUFRRSxJQUFsQjtBQUNILFNBSEQsTUFLQTtBQUNJLGtCQUFLSCxLQUFMLEdBQWFBLEtBQWI7QUFDSDtBQVpMO0FBYUM7Ozs7K0JBR0Q7QUFDSSxnQkFBTUksMkdBQU47QUFDQUEsaUJBQUtKLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBSSxpQkFBS0MsU0FBTCxHQUFpQixLQUFLSixPQUFMLENBQWFJLFNBQTlCO0FBQ0EsbUJBQU9ELElBQVA7QUFDSDs7OzZCQUVJRCxLLEVBQ0w7QUFDSSxpSEFBV0EsS0FBWDtBQUNBLGlCQUFLSCxLQUFMLEdBQWFHLE1BQUtILEtBQWxCO0FBQ0EsaUJBQUtDLE9BQUwsQ0FBYUksU0FBYixHQUF5QkYsTUFBS0UsU0FBOUI7QUFDSDs7O2tDQUVTQyxPLEVBQ1Y7QUFDSSxnQkFBTUMsU0FBUyxLQUFLVCxNQUFMLENBQVlVLENBQVosR0FBZ0IsS0FBS1QsTUFBTCxDQUFZUyxDQUEzQztBQUNBLGdCQUFNQyxTQUFTLEtBQUtYLE1BQUwsQ0FBWVksQ0FBWixHQUFnQixLQUFLWCxNQUFMLENBQVlXLENBQTNDO0FBQ0EsZ0JBQUlILFdBQVcsQ0FBWCxJQUFnQkUsV0FBVyxDQUEvQixFQUNBO0FBQ0kscUJBQUtFLElBQUwsQ0FBVSxNQUFWLEVBQWtCLEtBQUtaLE1BQXZCO0FBQ0Esb0JBQUksQ0FBQyxLQUFLRSxPQUFMLENBQWFJLFNBQWxCLEVBQ0E7QUFDSSwyQkFBTyxJQUFQO0FBQ0g7QUFDSixhQVBELE1BU0E7QUFDSSxvQkFBTU8sUUFBUUMsS0FBS0MsS0FBTCxDQUFXTCxNQUFYLEVBQW1CRixNQUFuQixDQUFkO0FBQ0EscUJBQUtSLE1BQUwsQ0FBWVMsQ0FBWixJQUFpQkssS0FBS0UsR0FBTCxDQUFTSCxLQUFULElBQWtCTixPQUFsQixHQUE0QixLQUFLTixLQUFsRDtBQUNBLHFCQUFLRCxNQUFMLENBQVlXLENBQVosSUFBaUJHLEtBQUtHLEdBQUwsQ0FBU0osS0FBVCxJQUFrQk4sT0FBbEIsR0FBNEIsS0FBS04sS0FBbEQ7QUFDQSxvQkFBS08sVUFBVSxDQUFYLEtBQW9CLEtBQUtULE1BQUwsQ0FBWVUsQ0FBWixHQUFnQixLQUFLVCxNQUFMLENBQVlTLENBQTdCLElBQW1DLENBQTFELEVBQ0E7QUFDSSx5QkFBS1QsTUFBTCxDQUFZUyxDQUFaLEdBQWdCLEtBQUtWLE1BQUwsQ0FBWVUsQ0FBNUI7QUFDSDtBQUNELG9CQUFLQyxVQUFVLENBQVgsS0FBb0IsS0FBS1gsTUFBTCxDQUFZWSxDQUFaLEdBQWdCLEtBQUtYLE1BQUwsQ0FBWVcsQ0FBN0IsSUFBbUMsQ0FBMUQsRUFDQTtBQUNJLHlCQUFLWCxNQUFMLENBQVlXLENBQVosR0FBZ0IsS0FBS1osTUFBTCxDQUFZWSxDQUE1QjtBQUNIO0FBQ0o7QUFDSjs7OztFQW5FZ0JkLEk7O0FBc0VyQnFCLE9BQU9DLE9BQVAsR0FBaUJwQixNQUFqQiIsImZpbGUiOiJ0YXJnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3YWl0ID0gcmVxdWlyZSgnLi93YWl0JylcblxuLyoqIG1vdmUgYW4gb2JqZWN0IHRvIGEgdGFyZ2V0J3MgbG9jYXRpb24gKi9cbmNsYXNzIHRhcmdldCBleHRlbmRzIHdhaXRcbntcbiAgICAvKipcbiAgICAgKiBtb3ZlIHRvIGEgdGFyZ2V0XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIG9iamVjdCB0byBhbmltYXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldCAtIG9iamVjdCBuZWVkcyB0byBjb250YWluIHt4OiB4LCB5OiB5fVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZSBwZXIgbWlsbGlzZWNvbmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIEBzZWUge0BsaW5rIFdhaXR9XG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5rZWVwQWxpdmVdIGRvbid0IGNhbmNlbCB0aGUgYW5pbWF0aW9uIHdoZW4gdGFyZ2V0IGlzIHJlYWNoZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QsIHRhcmdldCwgc3BlZWQsIG9wdGlvbnMpXG4gICAge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpXG4gICAgICAgIHRoaXMudHlwZSA9ICdUYXJnZXQnXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0XG4gICAgICAgIGlmIChvcHRpb25zLmxvYWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9hZChvcHRpb25zLmxvYWQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgc2F2ZSA9IHN1cGVyLnNhdmUoKVxuICAgICAgICBzYXZlLnNwZWVkID0gdGhpcy5zcGVlZFxuICAgICAgICBzYXZlLmtlZXBBbGl2ZSA9IHRoaXMub3B0aW9ucy5rZWVwQWxpdmVcbiAgICAgICAgcmV0dXJuIHNhdmVcbiAgICB9XG5cbiAgICBsb2FkKGxvYWQpXG4gICAge1xuICAgICAgICBzdXBlci5sb2FkKGxvYWQpXG4gICAgICAgIHRoaXMuc3BlZWQgPSBsb2FkLnNwZWVkXG4gICAgICAgIHRoaXMub3B0aW9ucy5rZWVwQWxpdmUgPSBsb2FkLmtlZXBBbGl2ZVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZShlbGFwc2VkKVxuICAgIHtcbiAgICAgICAgY29uc3QgZGVsdGFYID0gdGhpcy50YXJnZXQueCAtIHRoaXMub2JqZWN0LnhcbiAgICAgICAgY29uc3QgZGVsdGFZID0gdGhpcy50YXJnZXQueSAtIHRoaXMub2JqZWN0LnlcbiAgICAgICAgaWYgKGRlbHRhWCA9PT0gMCAmJiBkZWx0YVkgPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIHRoaXMub2JqZWN0KVxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEFsaXZlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoZGVsdGFZLCBkZWx0YVgpXG4gICAgICAgICAgICB0aGlzLm9iamVjdC54ICs9IE1hdGguY29zKGFuZ2xlKSAqIGVsYXBzZWQgKiB0aGlzLnNwZWVkXG4gICAgICAgICAgICB0aGlzLm9iamVjdC55ICs9IE1hdGguc2luKGFuZ2xlKSAqIGVsYXBzZWQgKiB0aGlzLnNwZWVkXG4gICAgICAgICAgICBpZiAoKGRlbHRhWCA+PSAwKSAhPT0gKCh0aGlzLnRhcmdldC54IC0gdGhpcy5vYmplY3QueCkgPj0gMCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QueCA9IHRoaXMudGFyZ2V0LnhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoZGVsdGFZID49IDApICE9PSAoKHRoaXMudGFyZ2V0LnkgLSB0aGlzLm9iamVjdC55KSA+PSAwKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC55ID0gdGhpcy50YXJnZXQueVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhcmdldCJdfQ==