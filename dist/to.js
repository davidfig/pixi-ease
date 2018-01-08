const wait = require('./wait');

/** animate any numeric parameter of an object or array of objects */
module.exports = class to extends wait {
    /**
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
    constructor(object, goto, duration, options) {
        options = options || {};
        super(object, options);
        this.type = 'To';
        if (Array.isArray(object)) {
            this.list = object;
            this.object = this.list[0];
        }
        if (options.load) {
            this.load(options.load);
        } else {
            this.goto = goto;
            this.fixScale();
            this.duration = duration;
            this.restart();
        }
    }

    /**
     * converts scale from { scale: n } to { scale: { x: n, y: n }}
     * @private
     */
    fixScale() {
        if (typeof this.goto['scale'] !== 'undefined' && !Number.isNaN(this.goto['scale'])) {
            this.goto['scale'] = { x: this.goto['scale'], y: this.goto['scale'] };
        }
    }

    save() {
        const save = super.save();
        save.goto = this.goto;
        save.start = this.start;
        save.delta = this.delta;
        save.keys = this.keys;
        return save;
    }

    load(load) {
        super.load(load);
        this.goto = load.goto;
        this.start = load.start;
        this.delta = load.delta;
        this.keys = load.keys;
    }

    restart() {
        let i = 0;
        const start = this.start = [];
        const delta = this.delta = [];
        const keys = this.keys = [];
        const goto = this.goto;
        const object = this.object;

        // loops through all keys in goto object
        for (let key in goto) {

            // handles keys with one additional level e.g.: goto = {scale: {x: 5, y: 3}}
            if (isNaN(goto[key])) {
                keys[i] = { key: key, children: [] };
                start[i] = [];
                delta[i] = [];
                let j = 0;
                for (let key2 in goto[key]) {
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

    reverse() {
        const object = this.object;
        const keys = this.keys;
        const goto = this.goto;
        const delta = this.delta;
        const start = this.start;

        for (let i = 0, _i = keys.length; i < _i; i++) {
            const key = keys[i];
            if (isNaN(goto[key])) {
                for (let j = 0, _j = key.children.length; j < _j; j++) {
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

    calculate() /*elapsed*/{
        const object = this.object;
        const list = this.list;
        const keys = this.keys;
        const goto = this.goto;
        const time = this.time;
        const start = this.start;
        const delta = this.delta;
        const duration = this.duration;
        const ease = this.options.ease;
        for (let i = 0, _i = this.keys.length; i < _i; i++) {
            const key = keys[i];
            if (isNaN(goto[key])) {
                const key1 = key.key;
                for (let j = 0, _j = key.children.length; j < _j; j++) {
                    const key2 = key.children[j];
                    const others = object[key1][key2] = time >= duration ? start[i][j] + delta[i][j] : ease(time, start[i][j], delta[i][j], duration);
                    if (list) {
                        for (let k = 1, _k = list.length; k < _k; k++) {
                            list[k][key1][key2] = others;
                        }
                    }
                }
            } else {
                const key = keys[i];
                const others = object[key] = time >= duration ? start[i] + delta[i] : ease(time, start[i], delta[i], duration);
                if (list) {
                    for (let j = 1, _j = this.list.length; j < _j; j++) {
                        list[j][key] = others;
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90by5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0byIsImNvbnN0cnVjdG9yIiwib2JqZWN0IiwiZ290byIsImR1cmF0aW9uIiwib3B0aW9ucyIsInR5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJsaXN0IiwibG9hZCIsImZpeFNjYWxlIiwicmVzdGFydCIsIk51bWJlciIsImlzTmFOIiwieCIsInkiLCJzYXZlIiwic3RhcnQiLCJkZWx0YSIsImtleXMiLCJpIiwia2V5IiwiY2hpbGRyZW4iLCJqIiwia2V5MiIsInBhcnNlRmxvYXQiLCJfY29ycmVjdERPTSIsInRpbWUiLCJyZXZlcnNlIiwiX2kiLCJsZW5ndGgiLCJfaiIsImNhbGN1bGF0ZSIsImVhc2UiLCJrZXkxIiwib3RoZXJzIiwiayIsIl9rIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQTtBQUNBQyxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEVBQU4sU0FBaUJKLElBQWpCLENBQ2pCO0FBQ0k7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQUssZ0JBQVlDLE1BQVosRUFBb0JDLElBQXBCLEVBQTBCQyxRQUExQixFQUFvQ0MsT0FBcEMsRUFDQTtBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBLGNBQU1ILE1BQU4sRUFBY0csT0FBZDtBQUNBLGFBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsWUFBSUMsTUFBTUMsT0FBTixDQUFjTixNQUFkLENBQUosRUFDQTtBQUNJLGlCQUFLTyxJQUFMLEdBQVlQLE1BQVo7QUFDQSxpQkFBS0EsTUFBTCxHQUFjLEtBQUtPLElBQUwsQ0FBVSxDQUFWLENBQWQ7QUFDSDtBQUNELFlBQUlKLFFBQVFLLElBQVosRUFDQTtBQUNJLGlCQUFLQSxJQUFMLENBQVVMLFFBQVFLLElBQWxCO0FBQ0gsU0FIRCxNQUtBO0FBQ0ksaUJBQUtQLElBQUwsR0FBWUEsSUFBWjtBQUNBLGlCQUFL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d2FpdCcpXHJcblxyXG4vKiogYW5pbWF0ZSBhbnkgbnVtZXJpYyBwYXJhbWV0ZXIgb2YgYW4gb2JqZWN0IG9yIGFycmF5IG9mIG9iamVjdHMgKi9cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyB0byBleHRlbmRzIHdhaXRcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBnb3RvIC0gcGFyYW1ldGVycyB0byBhbmltYXRlLCBlLmcuOiB7YWxwaGE6IDUsIHNjYWxlOiB7MywgNX0sIHNjYWxlOiA1LCByb3RhdGlvbjogTWF0aC5QSX1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiAtIHRpbWUgdG8gcnVuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMud2FpdD0wXSBuIG1pbGxpc2Vjb25kcyBiZWZvcmUgc3RhcnRpbmcgYW5pbWF0aW9uIChjYW4gYWxzbyBiZSB1c2VkIHRvIHBhdXNlIGFuaW1hdGlvbiBmb3IgYSBsZW5ndGggb2YgdGltZSlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VdIHN0YXJ0IHRoZSBhbmltYXRpb24gcGF1c2VkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58bnVtYmVyfSBbb3B0aW9ucy5yZXBlYXRdIHRydWU6IHJlcGVhdCBhbmltYXRpb24gZm9yZXZlciBuOiByZXBlYXQgYW5pbWF0aW9uIG4gdGltZXNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXJ9IFtvcHRpb25zLnJldmVyc2VdIHRydWU6IHJldmVyc2UgYW5pbWF0aW9uIChpZiBjb21iaW5lZCB3aXRoIHJlcGVhdCwgdGhlbiBwdWxzZSkgbjogcmV2ZXJzZSBhbmltYXRpb24gbiB0aW1lc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMubG9hZF0gbG9hZHMgYW4gYW5pbWF0aW9uIHVzaW5nIGFuIC5zYXZlKCkgb2JqZWN0IG5vdGUgdGhlICogcGFyYW1ldGVycyBiZWxvdyBjYW5ub3QgYmUgbG9hZGVkIGFuZCBtdXN0IGJlIHJlLXNldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8RnVuY3Rpb259IFtvcHRpb25zLmVhc2VdIG5hbWUgb3IgZnVuY3Rpb24gZnJvbSBlYXNpbmcuanMgKHNlZSBodHRwOi8vZWFzaW5ncy5uZXQgZm9yIGV4YW1wbGVzKVxyXG4gICAgICogQGVtaXRzIHRvOmRvbmUgYW5pbWF0aW9uIGV4cGlyZXNcclxuICAgICAqIEBlbWl0cyB0bzp3YWl0IGVhY2ggdXBkYXRlIGR1cmluZyBhIHdhaXRcclxuICAgICAqIEBlbWl0cyB0bzpmaXJzdCBmaXJzdCB1cGRhdGUgd2hlbiBhbmltYXRpb24gc3RhcnRzXHJcbiAgICAgKiBAZW1pdHMgdG86ZWFjaCBlYWNoIHVwZGF0ZSB3aGlsZSBhbmltYXRpb24gaXMgcnVubmluZ1xyXG4gICAgICogQGVtaXRzIHRvOmxvb3Agd2hlbiBhbmltYXRpb24gaXMgcmVwZWF0ZWRcclxuICAgICAqIEBlbWl0cyB0bzpyZXZlcnNlIHdoZW4gYW5pbWF0aW9uIGlzIHJldmVyc2VkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCwgZ290bywgZHVyYXRpb24sIG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpXHJcbiAgICAgICAgdGhpcy50eXBlID0gJ1RvJ1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBvYmplY3RcclxuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSB0aGlzLmxpc3RbMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZChvcHRpb25zLmxvYWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ290byA9IGdvdG9cclxuICAgICAgICAgICAgdGhpcy5maXhTY2FsZSgpXHJcbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvblxyXG4gICAgICAgICAgICB0aGlzLnJlc3RhcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnZlcnRzIHNjYWxlIGZyb20geyBzY2FsZTogbiB9IHRvIHsgc2NhbGU6IHsgeDogbiwgeTogbiB9fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZml4U2NhbGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5nb3RvWydzY2FsZSddICE9PSAndW5kZWZpbmVkJyAmJiAhTnVtYmVyLmlzTmFOKHRoaXMuZ290b1snc2NhbGUnXSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdvdG9bJ3NjYWxlJ10gPSB7eDogdGhpcy5nb3RvWydzY2FsZSddLCB5OiB0aGlzLmdvdG9bJ3NjYWxlJ119XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNhdmUgPSBzdXBlci5zYXZlKClcclxuICAgICAgICBzYXZlLmdvdG8gPSB0aGlzLmdvdG9cclxuICAgICAgICBzYXZlLnN0YXJ0ID0gdGhpcy5zdGFydFxyXG4gICAgICAgIHNhdmUuZGVsdGEgPSB0aGlzLmRlbHRhXHJcbiAgICAgICAgc2F2ZS5rZXlzID0gdGhpcy5rZXlzXHJcbiAgICAgICAgcmV0dXJuIHNhdmVcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKGxvYWQpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIubG9hZChsb2FkKVxyXG4gICAgICAgIHRoaXMuZ290byA9IGxvYWQuZ290b1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBsb2FkLnN0YXJ0XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IGxvYWQuZGVsdGFcclxuICAgICAgICB0aGlzLmtleXMgPSBsb2FkLmtleXNcclxuICAgIH1cclxuXHJcbiAgICByZXN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnQgPSBbXVxyXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5kZWx0YSA9IFtdXHJcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cyA9IFtdXHJcbiAgICAgICAgY29uc3QgZ290byA9IHRoaXMuZ290b1xyXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMub2JqZWN0XHJcblxyXG4gICAgICAgIC8vIGxvb3BzIHRocm91Z2ggYWxsIGtleXMgaW4gZ290byBvYmplY3RcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ290bylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAvLyBoYW5kbGVzIGtleXMgd2l0aCBvbmUgYWRkaXRpb25hbCBsZXZlbCBlLmcuOiBnb3RvID0ge3NjYWxlOiB7eDogNSwgeTogM319XHJcbiAgICAgICAgICAgIGlmIChpc05hTihnb3RvW2tleV0pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBrZXlzW2ldID0geyBrZXk6IGtleSwgY2hpbGRyZW46IFtdIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0W2ldID0gW11cclxuICAgICAgICAgICAgICAgIGRlbHRhW2ldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBqID0gMFxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5MiBpbiBnb3RvW2tleV0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5c1tpXS5jaGlsZHJlbltqXSA9IGtleTJcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFtpXVtqXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleV1ba2V5Ml0pXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRbaV1bal0gPSB0aGlzLl9jb3JyZWN0RE9NKGtleTIsIHN0YXJ0W2ldW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0W2ldW2pdID0gaXNOYU4odGhpcy5zdGFydFtpXVtqXSkgPyAwIDogc3RhcnRbaV1bal1cclxuICAgICAgICAgICAgICAgICAgICBkZWx0YVtpXVtqXSA9IGdvdG9ba2V5XVtrZXkyXSAtIHN0YXJ0W2ldW2pdXHJcbiAgICAgICAgICAgICAgICAgICAgaisrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleV0pXHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IHRoaXMuX2NvcnJlY3RET00oa2V5LCBzdGFydFtpXSlcclxuICAgICAgICAgICAgICAgIHN0YXJ0W2ldID0gaXNOYU4odGhpcy5zdGFydFtpXSkgPyAwIDogc3RhcnRbaV1cclxuICAgICAgICAgICAgICAgIGRlbHRhW2ldID0gZ290b1trZXldIC0gc3RhcnRbaV1cclxuICAgICAgICAgICAgICAgIGtleXNbaV0gPSBrZXlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpKytcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHRoaXMub2JqZWN0XHJcbiAgICAgICAgY29uc3Qga2V5cyA9IHRoaXMua2V5c1xyXG4gICAgICAgIGNvbnN0IGdvdG8gPSB0aGlzLmdvdG9cclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGFcclxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnRcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0ga2V5cy5sZW5ndGg7IGkgPCBfaTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXVxyXG4gICAgICAgICAgICBpZiAoaXNOYU4oZ290b1trZXldKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIF9qID0ga2V5LmNoaWxkcmVuLmxlbmd0aDsgaiA8IF9qOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFbaV1bal0gPSAtZGVsdGFbaV1bal1cclxuICAgICAgICAgICAgICAgICAgICBzdGFydFtpXVtqXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleS5rZXldW2tleS5jaGlsZHJlbltqXV0pXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRbaV1bal0gPSBpc05hTihzdGFydFtpXVtqXSkgPyAwIDogc3RhcnRbaV1bal1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlbHRhW2ldID0gLWRlbHRhW2ldXHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IHBhcnNlRmxvYXQob2JqZWN0W2tleV0pXHJcbiAgICAgICAgICAgICAgICBzdGFydFtpXSA9IGlzTmFOKHN0YXJ0W2ldKSA/IDAgOiBzdGFydFtpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZSgvKmVsYXBzZWQqLylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvYmplY3QgPSB0aGlzLm9iamVjdFxyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RcclxuICAgICAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzXHJcbiAgICAgICAgY29uc3QgZ290byA9IHRoaXMuZ290b1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVcclxuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuc3RhcnRcclxuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuZGVsdGFcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb25cclxuICAgICAgICBjb25zdCBlYXNlID0gdGhpcy5vcHRpb25zLmVhc2VcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgX2kgPSB0aGlzLmtleXMubGVuZ3RoOyBpIDwgX2k7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV1cclxuICAgICAgICAgICAgaWYgKGlzTmFOKGdvdG9ba2V5XSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleTEgPSBrZXkua2V5XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgX2ogPSBrZXkuY2hpbGRyZW4ubGVuZ3RoOyBqIDwgX2o7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkyID0ga2V5LmNoaWxkcmVuW2pdXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJzID0gb2JqZWN0W2tleTFdW2tleTJdID0gKHRpbWUgPj0gZHVyYXRpb24pID8gc3RhcnRbaV1bal0gKyBkZWx0YVtpXVtqXSA6IGVhc2UodGltZSwgc3RhcnRbaV1bal0sIGRlbHRhW2ldW2pdLCBkdXJhdGlvbilcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxLCBfayA9IGxpc3QubGVuZ3RoOyBrIDwgX2s7IGsrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtrXVtrZXkxXVtrZXkyXSA9IG90aGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJzID0gb2JqZWN0W2tleV0gPSAodGltZSA+PSBkdXJhdGlvbikgPyBzdGFydFtpXSArIGRlbHRhW2ldIDogZWFzZSh0aW1lLCBzdGFydFtpXSwgZGVsdGFbaV0sIGR1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDEsIF9qID0gdGhpcy5saXN0Lmxlbmd0aDsgaiA8IF9qOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0W2pdW2tleV0gPSBvdGhlcnNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=