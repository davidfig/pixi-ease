'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');

/** animate any numeric parameter of an object or array of objects */

var to = function (_wait) {
    _inherits(to, _wait);

    /**
     * @private
     * @param {object} object to animate
     * @param {object} goto - parameters to animate, e.g.: {alpha: 5, scale: {3, 5}, scale: 5, rotation: Math.PI}
     * @param {number} duration - time to run
     * @param {object} [options]
     * @param {number} [options.wait=0] n milliseconds before starting animation (can also be used to pause animation for a length of time)
     * @param {boolean} [options.pause] start the animation paused
     * @param {boolean|number} [options.repeat] true: repeat animation forever n: repeat animation n times
     * @param {boolean|number} [options.reverse] true: reverse animation (if combined with repeat, then pulse) n: reverse animation n times
     * @param {Function} [options.load] loads an animation using an .save() object note the * parameters below cannot be loaded and must be re-set
     * @param {string|Function} [options.ease] name or function from easing.js (see http://easings.net for examples)
     * @emits to:done animation expires
     * @emits to:wait each update during a wait
     * @emits to:first first update when animation starts
     * @emits to:each each update while animation is running
     * @emits to:loop when animation is repeated
     * @emits to:reverse when animation is reversed
     */
    function to(object, goto, duration, options) {
        _classCallCheck(this, to);

        options = options || {};

        var _this = _possibleConstructorReturn(this, (to.__proto__ || Object.getPrototypeOf(to)).call(this, object, options));

        _this.type = 'To';
        if (Array.isArray(object)) {
            _this.list = object;
            _this.object = _this.list[0];
        }
        if (options.load) {
            _this.load(options.load);
        } else {
            _this.goto = goto;
            _this.fixScale();
            _this.duration = duration;
            _this.restart();
        }
        return _this;
    }

    /**
     * converts scale from { scale: n } to { scale: { x: n, y: n }}
     * @private
     */


    _createClass(to, [{
        key: 'fixScale',
        value: function fixScale() {
            if (typeof this.goto['scale'] !== 'undefined' && !Number.isNaN(this.goto['scale'])) {
                this.goto['scale'] = { x: this.goto['scale'], y: this.goto['scale'] };
            }
        }
    }, {
        key: 'save',
        value: function save() {
            var save = _get(to.prototype.__proto__ || Object.getPrototypeOf(to.prototype), 'save', this).call(this);
            save.goto = this.goto;
            save.start = this.start;
            save.delta = this.delta;
            save.keys = this.keys;
            return save;
        }
    }, {
        key: 'load',
        value: function load(_load) {
            _get(to.prototype.__proto__ || Object.getPrototypeOf(to.prototype), 'load', this).call(this, _load);
            this.goto = _load.goto;
            this.start = _load.start;
            this.delta = _load.delta;
            this.keys = _load.keys;
        }
    }, {
        key: 'restart',
        value: function restart() {
            var i = 0;
            var start = this.start = [];
            var delta = this.delta = [];
            var keys = this.keys = [];
            var goto = this.goto;
            var object = this.object;

            // loops through all keys in goto object
            for (var key in goto) {

                // handles keys with one additional level e.g.: goto = {scale: {x: 5, y: 3}}
                if (isNaN(goto[key])) {
                    keys[i] = { key: key, children: [] };
                    start[i] = [];
                    delta[i] = [];
                    var j = 0;
                    for (var key2 in goto[key]) {
                        keys[i].children[j] = key2;
                        start[i][j] = parseFloat(object[key][key2]);
                        start[i][j] = this._correctDOM(key2, start[i][j]);
                        start[i][j] = isNaN(this.start[i][j]) ? 0 : start[i][j];
                        delta[i][j] = goto[key][key2] - start[i][j];
                        j++;
                    }
                } else {
                    start[i] = parseFloat(object[key]);
                    start[i] = this._correctDOM(key, start[i]);
                    start[i] = isNaN(this.start[i]) ? 0 : start[i];
                    delta[i] = goto[key] - start[i];
                    keys[i] = key;
                }
                i++;
            }
            this.time = 0;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            var object = this.object;
            var keys = this.keys;
            var goto = this.goto;
            var delta = this.delta;
            var start = this.start;

            for (var i = 0, _i = keys.length; i < _i; i++) {
                var key = keys[i];
                if (isNaN(goto[key])) {
                    for (var j = 0, _j = key.children.length; j < _j; j++) {
                        delta[i][j] = -delta[i][j];
                        start[i][j] = parseFloat(object[key.key][key.children[j]]);
                        start[i][j] = isNaN(start[i][j]) ? 0 : start[i][j];
                    }
                } else {
                    delta[i] = -delta[i];
                    start[i] = parseFloat(object[key]);
                    start[i] = isNaN(start[i]) ? 0 : start[i];
                }
            }
        }
    }, {
        key: 'calculate',
        value: function calculate() /*elapsed*/{
            var object = this.object;
            var list = this.list;
            var keys = this.keys;
            var goto = this.goto;
            var time = this.time;
            var start = this.start;
            var delta = this.delta;
            var duration = this.duration;
            var ease = this.options.ease;
            for (var i = 0, _i = this.keys.length; i < _i; i++) {
                var key = keys[i];
                if (isNaN(goto[key])) {
                    var key1 = key.key;
                    for (var j = 0, _j = key.children.length; j < _j; j++) {
                        var key2 = key.children[j];
                        var others = object[key1][key2] = time >= duration ? start[i][j] + delta[i][j] : ease(time, start[i][j], delta[i][j], duration);
                        if (list) {
                            for (var k = 1, _k = list.length; k < _k; k++) {
                                list[k][key1][key2] = others;
                            }
                        }
                    }
                } else {
                    var _key = keys[i];
                    var _others = object[_key] = time >= duration ? start[i] + delta[i] : ease(time, start[i], delta[i], duration);
                    if (list) {
                        for (var _j2 = 1, _j3 = this.list.length; _j2 < _j3; _j2++) {
                            list[_j2][_key] = _others;
                        }
                    }
                }
            }
        }
    }]);

    return to;
}(wait);

module.exports = to;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90by5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsInRvIiwib2JqZWN0IiwiZ290byIsImR1cmF0aW9uIiwib3B0aW9ucyIsInR5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJsaXN0IiwibG9hZCIsImZpeFNjYWxlIiwicmVzdGFydCIsIk51bWJlciIsImlzTmFOIiwieCIsInkiLCJzYXZlIiwic3RhcnQiLCJkZWx0YSIsImtleXMiLCJpIiwia2V5IiwiY2hpbGRyZW4iLCJqIiwia2V5MiIsInBhcnNlRmxvYXQiLCJfY29ycmVjdERPTSIsInRpbWUiLCJfaSIsImxlbmd0aCIsIl9qIiwiZWFzZSIsImtleTEiLCJvdGhlcnMiLCJrIiwiX2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQTs7SUFDTUMsRTs7O0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsZ0JBQVlDLE1BQVosRUFBb0JDLElBQXBCLEVBQTBCQyxRQUExQixFQUFvQ0MsT0FBcEMsRUFDQTtBQUFBOztBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjs7QUFESiw0R0FFVUgsTUFGVixFQUVrQkcsT0FGbEI7O0FBR0ksY0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxZQUFJQyxNQUFNQyxPQUFOLENBQWNOLE1BQWQsQ0FBSixFQUNBO0FBQ0ksa0JBQUtPLElBQUwsR0FBWVAsTUFBWjtBQUNBLGtCQUFLQSxNQUFMLEdBQWMsTUFBS08sSUFBTCxDQUFVLENBQVYsQ0FBZDtBQUNIO0FBQ0QsWUFBSUosUUFBUUssSUFBWixFQUNBO0FBQ0ksa0JBQUtBLElBQUwsQ0FBVUwsUUFBUUssSUFBbEI7QUFDSCxTQUhELE1BS0E7QUFDSSxrQkFBS1AsSUFBTCxHQUFZQSxJQUFaO0FBQ0Esa0JBQUtRLFFBQUw7QUFDQSxrQkFBS1AsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxrQkFBS1EsT0FBTDtB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LFFBQVQsR0FBcUJjLE1BQU1HLENBQU4sRUFBU0csQ0FBVCxJQUFjTCxNQUFNRSxDQUFOLEVBQVNHLENBQVQsQ0FBbkMsR0FBaURRLEtBQUtKLElBQUwsRUFBV1YsTUFBTUcsQ0FBTixFQUFTRyxDQUFULENBQVgsRUFBd0JMLE1BQU1FLENBQU4sRUFBU0csQ0FBVCxDQUF4QixFQUFxQ3BCLFFBQXJDLENBQXJGO0FBQ0EsNEJBQUlLLElBQUosRUFDQTtBQUNJLGlDQUFLLElBQUkwQixJQUFJLENBQVIsRUFBV0MsS0FBSzNCLEtBQUtxQixNQUExQixFQUFrQ0ssSUFBSUMsRUFBdEMsRUFBMENELEdBQTFDLEVBQ0E7QUFDSTFCLHFDQUFLMEIsQ0FBTCxFQUFRRixJQUFSLEVBQWNSLElBQWQsSUFBc0JTLE1BQXRCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osaUJBZkQsTUFpQkE7QUFDSSx3QkFBTVosT0FBTUYsS0FBS0MsQ0FBTCxDQUFaO0FBQ0Esd0JBQU1hLFVBQVNoQyxPQUFPb0IsSUFBUCxJQUFlTSxRQUFReEIsUUFBVCxHQUFxQmMsTUFBTUcsQ0FBTixJQUFXRixNQUFNRSxDQUFOLENBQWhDLEdBQTJDVyxLQUFLSixJQUFMLEVBQVdWLE1BQU1HLENBQU4sQ0FBWCxFQUFxQkYsTUFBTUUsQ0FBTixDQUFyQixFQUErQmpCLFFBQS9CLENBQXhFO0FBQ0Esd0JBQUlLLElBQUosRUFDQTtBQUNJLDZCQUFLLElBQUllLE1BQUksQ0FBUixFQUFXTyxNQUFLLEtBQUt0QixJQUFMLENBQVVxQixNQUEvQixFQUF1Q04sTUFBSU8sR0FBM0MsRUFBK0NQLEtBQS9DLEVBQ0E7QUFDSWYsaUNBQUtlLEdBQUwsRUFBUUYsSUFBUixJQUFlWSxPQUFmO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSjs7OztFQTlMWW5DLEk7O0FBaU1qQnNDLE9BQU9DLE9BQVAsR0FBaUJyQyxFQUFqQiIsImZpbGUiOiJ0by5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHdhaXQgPSByZXF1aXJlKCcuL3dhaXQnKVxyXG5cclxuLyoqIGFuaW1hdGUgYW55IG51bWVyaWMgcGFyYW1ldGVyIG9mIGFuIG9iamVjdCBvciBhcnJheSBvZiBvYmplY3RzICovXHJcbmNsYXNzIHRvIGV4dGVuZHMgd2FpdFxyXG57XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBnb3RvIC0gcGFyYW1ldGVycyB0byBhbmltYXRlLCBlLmcuOiB7YWxwaGE6IDUsIHNjYWxlOiB7MywgNX0sIHNjYWxlOiA1LCByb3RhdGlvbjogTWF0aC5QSX1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiAtIHRpbWUgdG8gcnVuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMud2FpdD0wXSBuIG1pbGxpc2Vjb25kcyBiZWZvcmUgc3RhcnRpbmcgYW5pbWF0aW9uIChjYW4gYWxzbyBiZSB1c2VkIHRvIHBhdXNlIGFuaW1hdGlvbiBmb3IgYSBsZW5ndGggb2YgdGltZSlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VdIHN0YXJ0IHRoZSBhbmltYXRpb24gcGF1c2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58bnVtYmVyfSBbb3B0aW9ucy5yZXBlYXRdIHRydWU6IHJlcGVhdCBhbmltYXRpb24gZm9yZXZlciBuOiByZXBlYXQgYW5pbWF0aW9uIG4gdGltZXNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXJ9IFtvcHRpb25zLnJldmVyc2VdIHRydWU6IHJldmVyc2UgYW5pbWF0aW9uIChpZiBjb21iaW5lZCB3aXRoIHJlcGVhdCwgdGhlbiBwdWxzZSkgbjogcmV2ZXJzZSBhbmltYXRpb24gbiB0aW1lc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMubG9hZF0gbG9hZHMgYW4gYW5pbWF0aW9uIHVzaW5nIGFuIC5zYXZlKCkgb2JqZWN0IG5vdGUgdGhlICogcGFyYW1ldGVycyBiZWxvdyBjYW5ub3QgYmUgbG9hZGVkIGFuZCBtdXN0IGJlIHJlLXNldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8RnVuY3Rpb259IFtvcHRpb25zLmVhc2VdIG5hbWUgb3IgZnVuY3Rpb24gZnJvbSBlYXNpbmcuanMgKHNlZSBodHRwOi8vZWFzaW5ncy5uZXQgZm9yIGV4YW1wbGVzKVxyXG4gICAgICogQGVtaXRzIHRvOmRvbmUgYW5pbWF0aW9uIGV4cGlyZXNcclxuICAgICAqIEBlbWl0cyB0bzp3YWl0IGVhY2ggdXBkYXRlIGR1cmluZyBhIHdhaXRcclxuICAgICAqIEBlbWl0cyB0bzpmaXJzdCBmaXJzdCB1cGRhdGUgd2hlbiBhbmltYXRpb24gc3RhcnRzXHJcbiAgICAgKiBAZW1pdHMgdG86ZWFjaCBlYWNoIHVwZGF0ZSB3aGlsZSBhbmltYXRpb24gaXMgcnVubmluZ1xyXG4gICAgICogQGVtaXRzIHRvOmxvb3Agd2hlbiBhbmltYXRpb24gaXMgcmVwZWF0ZWRcclxuICAgICAqIEBlbWl0cyB0bzpyZXZlcnNlIHdoZW4gYW5pbWF0aW9uIGlzIHJldmVyc2VkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCwgZ290bywgZHVyYXRpb24sIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy50eXBlID0gJ1RvJ1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBvYmplY3RcclxuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSB0aGlzLmxpc3RbMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZChvcHRpb25zLmxvYWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ290byA9IGdvdG9cclxuICAgICAgICAgICAgdGhpcy5maXhTY2FsZSgpXHJcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvblxyXG4gICAgICAgICAgICB0aGlzLnJlc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIHNjYWxlIGZyb20geyBzY2FsZTogbiB9IHRvIHsgc2NhbGU6IHsgeDogbiwgeTogbiB9fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZml4U2NhbGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5nb3RvWydzY2FsZSddICE9PSAndW5kZWZpbmVkJyAmJiAhTnVtYmVyLmlzTmFOKHRoaXMuZ290b1snc2NhbGUnXSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdvdG9bJ3NjYWxlJ10gPSB7eDogdGhpcy5nb3RvWydzY2FsZSddLCB5OiB0aGlzLmdvdG9bJ3NjYWxlJ119XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNhdmUgPSBzdXBlci5zYXZlKClcclxuICAgICAgICBzYXZlLmdvdG8gPSB0aGlzLmdvdG9cclxuICAgICAgICBzYXZlLnN0YXJ0ID0gdGhpcy5zdGFydFxyXG4gICAgICAgIHNhdmUuZGVsdGEgPSB0aGlzLmRlbHRhXHJcbiAgICAgICAgc2F2ZS5rZXlzID0gdGhpcy5rZXlzXHJcbiAgICAgICAgcmV0dXJuIHNhdmVcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKGxvYWQpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIubG9hZChsb2FkKVxyXG4gICAgICAgIHRoaXMuZ290byA9IGxvYWQuZ290b1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBsb2FkLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IGxvYWQuZGVsdGFcclxuICAgICAgICB0aGlzLmtleXMgPSBsb2FkLmtleXNcclxuICAgIH1cclxuXHJcbiAgICByZXN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnQgPSBbXVxyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YSA9IFtdXHJcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cyA9IFtdXHJcbiAgICAgICAgY29uc3QgZ290byA9IHRoaXMuZ290b1xyXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMub2JqZWN0XHJcblxyXG4gICAgICAgIC8vIGxvb3BzIHRocm91Z2ggYWxsIGtleXMgaW4gZ290byBvYmplY3RcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ290bylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvLyBoYW5kbGVzIGtleXMgd2l0aCBvbmUgYWRkaXRpb25hbCBsZXZlbCBlLmcuOiBnb3RvID0ge3NjYWxlOiB7eDogNSwgeTogM319XHJcbiAgICAgICAgICAgIGlmIChpc05hTihnb3RvW2tleV0pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBrZXlzW2ldID0geyBrZXk6IGtleSwgY2hpbGRyZW46IFtdIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0W2ldID0gW11cclxuICAgICAgICAgICAgICAgIGRlbHRhW2ldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBqID0gMFxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5MiBpbiBnb3RvW2tleV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1tpXS5jaGlsZHJlbltqXSA9IGtleTJcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFtpXVtqXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleV1ba2V5Ml0pXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRbaV1bal0gPSB0aGlzLl9jb3JyZWN0RE9NKGtleTIsIHN0YXJ0W2ldW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0W2ldW2pdID0gaXNOYU4odGhpcy5zdGFydFtpXVtqXSkgPyAwIDogc3RhcnRbaV1bal1cclxuICAgICAgICAgICAgICAgICAgICBkZWx0YVtpXVtqXSA9IGdvdG9ba2V5XVtrZXkyXSAtIHN0YXJ0W2ldW2pdXHJcbiAgICAgICAgICAgICAgICAgICAgaisrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleV0pXHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IHRoaXMuX2NvcnJlY3RET00oa2V5LCBzdGFydFtpXSlcclxuICAgICAgICAgICAgICAgIHN0YXJ0W2ldID0gaXNOYU4odGhpcy5zdGFydFtpXSkgPyAwIDogc3RhcnRbaV1cclxuICAgICAgICAgICAgICAgIGRlbHRhW2ldID0gZ290b1trZXldIC0gc3RhcnRbaV1cclxuICAgICAgICAgICAgICAgIGtleXNbaV0gPSBrZXlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMub2JqZWN0XHJcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5c1xyXG4gICAgICAgIGNvbnN0IGdvdG8gPSB0aGlzLmdvdG9cclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGFcclxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnRcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0ga2V5cy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXVxyXG4gICAgICAgICAgICBpZiAoaXNOYU4oZ290b1trZXldKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIF9qID0ga2V5LmNoaWxkcmVuLmxlbmd0aDsgaiA8IF9qOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFbaV1bal0gPSAtZGVsdGFbaV1bal1cclxuICAgICAgICAgICAgICAgICAgICBzdGFydFtpXVtqXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleS5rZXldW2tleS5jaGlsZHJlbltqXV0pXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRbaV1bal0gPSBpc05hTihzdGFydFtpXVtqXSkgPyAwIDogc3RhcnRbaV1bal1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlbHRhW2ldID0gLWRlbHRhW2ldXHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleV0pXHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IGlzTmFOKHN0YXJ0W2ldKSA/IDAgOiBzdGFydFtpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZSgvKmVsYXBzZWQqLylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLm9iamVjdFxyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcclxuICAgICAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzXHJcbiAgICAgICAgY29uc3QgZ290byA9IHRoaXMuZ290b1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVcclxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnRcclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGFcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb25cclxuICAgICAgICBjb25zdCBlYXNlID0gdGhpcy5vcHRpb25zLmVhc2VcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0aGlzLmtleXMubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV1cclxuICAgICAgICAgICAgaWYgKGlzTmFOKGdvdG9ba2V5XSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleTEgPSBrZXkua2V5XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgX2ogPSBrZXkuY2hpbGRyZW4ubGVuZ3RoOyBqIDwgX2o7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkyID0ga2V5LmNoaWxkcmVuW2pdXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJzID0gb2JqZWN0W2tleTFdW2tleTJdID0gKHRpbWUgPj0gZHVyYXRpb24pID8gc3RhcnRbaV1bal0gKyBkZWx0YVtpXVtqXSA6IGVhc2UodGltZSwgc3RhcnRbaV1bal0sIGRlbHRhW2ldW2pdLCBkdXJhdGlvbilcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxLCBfayA9IGxpc3QubGVuZ3RoOyBrIDwgX2s7IGsrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtrXVtrZXkxXVtrZXkyXSA9IG90aGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJzID0gb2JqZWN0W2tleV0gPSAodGltZSA+PSBkdXJhdGlvbikgPyBzdGFydFtpXSArIGRlbHRhW2ldIDogZWFzZSh0aW1lLCBzdGFydFtpXSwgZGVsdGFbaV0sIGR1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDEsIF9qID0gdGhpcy5saXN0Lmxlbmd0aDsgaiA8IF9qOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0W2pdW2tleV0gPSBvdGhlcnNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdG8iXX0=