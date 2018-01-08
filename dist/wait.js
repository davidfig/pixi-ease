const Easing = require('penner');
const EventEmitter = require('eventemitter3');

module.exports = class wait extends EventEmitter {
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
    constructor(object, options) {
        super();
        this.object = object;
        this.options = options || {};
        this.type = 'Wait';
        if (this.options.load) {
            this.load(this.options.load);
        } else {
            this.time = 0;
        }
        if (this.options.ease && typeof this.options.ease !== 'function') {
            this.options.easeName = this.options.ease;
            this.options.ease = Easing[this.options.ease];
        }
        if (!this.options.ease) {
            this.options.ease = Easing['linear'];
        }
    }

    save() {
        const save = { type: this.type, time: this.time, duration: this.duration, ease: this.options.easeName };
        const options = this.options;
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

    load(load) {
        this.options.wait = load.wait;
        this.options.pause = load.pause;
        this.options.repeat = load.repeat;
        this.options.reverse = load.reverse;
        this.options.id = load.id;
        this.options.ease = load.ease;
        if (this.options.ease && typeof this.options.ease !== 'function') {
            this.options.easeName = this.options.ease;
            this.options.ease = Easing[this.options.ease];
        }
        if (!this.options.ease) {
            this.options.ease = Easing['linear'];
        }
        this.time = load.time;
        this.duration = load.duration;
    }

    /**
     * @type {boolean} pause this entry
     */
    set pause(value) {
        this.options.pause = value;
    }
    get pause() {
        return this.options.pause;
    }

    end(leftOver) {
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

    update(elapsed) {
        const options = this.options;
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
        let leftOver = 0;
        const duration = this.duration;
        let time = this.time;
        if (duration !== 0 && time > duration) {
            leftOver = time - duration;
            this.time = time = duration;
        }
        const force = this.calculate(elapsed);
        this.emit('each', elapsed, this.list || this.object, this);
        if (this.type === 'Wait' || duration !== 0 && time === duration) {
            return this.end(leftOver);
        }
        return force || time === duration;
    }

    // correct certain DOM values
    _correctDOM(key, value) {
        switch (key) {
            case 'opacity':
                return isNaN(value) ? 1 : value;
        }
        return value;
    }

    reverse() {}
    calculate() {}
    done() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93YWl0LmpzIl0sIm5hbWVzIjpbIkVhc2luZyIsInJlcXVpcmUiLCJFdmVudEVtaXR0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwid2FpdCIsImNvbnN0cnVjdG9yIiwib2JqZWN0Iiwib3B0aW9ucyIsInR5cGUiLCJsb2FkIiwidGltZSIsImVhc2UiLCJlYXNlTmFtZSIsInNhdmUiLCJkdXJhdGlvbiIsImlkIiwicGF1c2UiLCJyZXBlYXQiLCJyZXZlcnNlIiwidmFsdWUiLCJlbmQiLCJsZWZ0T3ZlciIsImVtaXQiLCJsaXN0IiwiZG9uZSIsInVwZGF0ZSIsImVsYXBzZWQiLCJmaXJzdCIsImZvcmNlIiwiY2FsY3VsYXRlIiwiX2NvcnJlY3RET00iLCJrZXkiLCJpc05hTiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNQyxlQUFlRCxRQUFRLGVBQVIsQ0FBckI7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUIsTUFBTUMsSUFBTixTQUFtQkgsWUFBbkIsQ0FDakI7QUFDSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQUksZ0JBQVlDLE1BQVosRUFBb0JDLE9BQXBCLEVBQ0E7QUFDSTtBQUNBLGFBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsV0FBVyxFQUExQjtBQUNBLGFBQUtDLElBQUwsR0FBWSxNQUFaO0FBQ0EsWUFBSSxLQUFLRCxPQUFMLENBQWFFLElBQWpCLEVBQ0E7QUFDSSxpQkFBS0EsSUFBTCxDQUFVLEtBQUtGLE9BQUwsQ0FBYUUsSUFBdkI7QUFDSCxTQUhELE1BS0E7QUFDSSxpQkFBS0MsSUFBTCxHQUFZLENBQVo7QUFDSDtBQUNELFlBQUksS0FBS0gsT0FBTCxDQUFhSSxJQUFiLElBQXFCLE9BQU8sS0FBS0osT0FBTCxDQUFhSSxJQUFwQixLQUE2QixVQUF0RCxFQUNBO0FBQ0ksaUJBQUtKLE9BQUwsQ0FBYUssUUFBYixHQUF3QixLQUFLTCxPQUFMLENBQWFJ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OlsiY29uc3QgRWFzaW5nID0gcmVxdWlyZSgncGVubmVyJylcclxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIHdhaXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdHxvYmplY3RbXX0gb2JqZWN0IG9yIGxpc3Qgb2Ygb2JqZWN0cyB0byBhbmltYXRlXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMud2FpdD0wXSBuIG1pbGxpc2Vjb25kcyBiZWZvcmUgc3RhcnRpbmcgYW5pbWF0aW9uIChjYW4gYWxzbyBiZSB1c2VkIHRvIHBhdXNlIGFuaW1hdGlvbiBmb3IgYSBsZW5ndGggb2YgdGltZSlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VdIHN0YXJ0IHRoZSBhbmltYXRpb24gcGF1c2VkXHJcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJlcGVhdF0gdHJ1ZTogcmVwZWF0IGFuaW1hdGlvbiBmb3JldmVyIG46IHJlcGVhdCBhbmltYXRpb24gbiB0aW1lc1xyXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXZlcnNlXSB0cnVlOiByZXZlcnNlIGFuaW1hdGlvbiAoaWYgY29tYmluZWQgd2l0aCByZXBlYXQsIHRoZW4gcHVsc2UpIG46IHJldmVyc2UgYW5pbWF0aW9uIG4gdGltZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuaWRdIHVzZXItZ2VuZXJhdGVkIGlkIChlLmcuLCBJIHVzZSBpdCB0byBwcm9wZXJseSBsb2FkIGFuaW1hdGlvbnMgd2hlbiBhbiBvYmplY3QgaGFzIG11bHRpcGxlIGFuaW1hdGlvbnMgcnVubmluZylcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmxvYWRdIGxvYWRzIGFuIGFuaW1hdGlvbiB1c2luZyBhbiAuc2F2ZSgpIG9iamVjdCBub3RlIHRoZSAqIHBhcmFtZXRlcnMgYmVsb3cgY2Fubm90IGJlIGxvYWRlZCBhbmQgbXVzdCBiZSByZS1zZXRcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258c3RyaW5nfSBbb3B0aW9ucy5lYXNlXSBmdW5jdGlvbiAob3IgcGVubmVyIGZ1bmN0aW9uIG5hbWUpIGZyb20gZWFzaW5nLmpzIChzZWUgaHR0cDovL2Vhc2luZ3MubmV0IGZvciBleGFtcGxlcykqXHJcbiAgICAgKlxyXG4gICAgICogQGVtaXRzIHtkb25lfSBhbmltYXRpb24gZXhwaXJlc1xyXG4gICAgICogQGVtaXRzIHt3YWl0fSBlYWNoIHVwZGF0ZSBkdXJpbmcgYSB3YWl0XHJcbiAgICAgKiBAZW1pdHMge2ZpcnN0fSBmaXJzdCB1cGRhdGUgd2hlbiBhbmltYXRpb24gc3RhcnRzXHJcbiAgICAgKiBAZW1pdHMge2VhY2h9IGVhY2ggdXBkYXRlIHdoaWxlIGFuaW1hdGlvbiBpcyBydW5uaW5nXHJcbiAgICAgKiBAZW1pdHMge2xvb3B9IHdoZW4gYW5pbWF0aW9uIGlzIHJlcGVhdGVkXHJcbiAgICAgKiBAZW1pdHMge3JldmVyc2V9IHdoZW4gYW5pbWF0aW9uIGlzIHJldmVyc2VkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCwgb3B0aW9ucylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3RcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICAgICAgdGhpcy50eXBlID0gJ1dhaXQnXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2FkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkKHRoaXMub3B0aW9ucy5sb2FkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZWFzZSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLmVhc2UgIT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZU5hbWUgPSB0aGlzLm9wdGlvbnMuZWFzZVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZWFzZSA9IEVhc2luZ1t0aGlzLm9wdGlvbnMuZWFzZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZWFzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gRWFzaW5nWydsaW5lYXInXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzYXZlID0geyB0eXBlOiB0aGlzLnR5cGUsIHRpbWU6IHRoaXMudGltZSwgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sIGVhc2U6IHRoaXMub3B0aW9ucy5lYXNlTmFtZSB9XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xyXG4gICAgICAgIGlmIChvcHRpb25zLndhaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYXZlLndhaXQgPSBvcHRpb25zLndhaXRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmlkICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhdmUuaWQgPSBvcHRpb25zLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnBhdXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2F2ZS5wYXVzZSA9IG9wdGlvbnMucGF1c2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2F2ZS5yZXBlYXQgPSBvcHRpb25zLnJlcGVhdFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5yZXZlcnNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2F2ZS5yZXZlcnNlID0gb3B0aW9ucy5yZXZlcnNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzYXZlXHJcbiAgICB9XHJcblxyXG4gICAgbG9hZChsb2FkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy53YWl0ID0gbG9hZC53YWl0XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhdXNlID0gbG9hZC5wYXVzZVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5yZXBlYXQgPSBsb2FkLnJlcGVhdFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5yZXZlcnNlID0gbG9hZC5yZXZlcnNlXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmlkID0gbG9hZC5pZFxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gbG9hZC5lYXNlXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5lYXNlICYmIHR5cGVvZiB0aGlzLm9wdGlvbnMuZWFzZSAhPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lYXNlTmFtZSA9IHRoaXMub3B0aW9ucy5lYXNlXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5lYXNlID0gRWFzaW5nW3RoaXMub3B0aW9ucy5lYXNlXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5lYXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmVhc2UgPSBFYXNpbmdbJ2xpbmVhciddXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZSA9IGxvYWQudGltZVxyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBsb2FkLmR1cmF0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn0gcGF1c2UgdGhpcyBlbnRyeVxyXG4gICAgICovXHJcbiAgICBzZXQgcGF1c2UodmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhdXNlID0gdmFsdWVcclxuICAgIH1cclxuICAgIGdldCBwYXVzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXVzZVxyXG4gICAgfVxyXG5cclxuICAgIGVuZChsZWZ0T3ZlcilcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJldmVyc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJldmVyc2UoKVxyXG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBsZWZ0T3ZlclxyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZXBlYXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmV2ZXJzZSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucmV2ZXJzZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJldmVyc2UtLVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlcGVhdC0tXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdsb29wJywgdGhpcy5saXN0IHx8IHRoaXMub2JqZWN0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMucmVwZWF0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gbGVmdE92ZXJcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZXBlYXQgIT09IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZXBlYXQtLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnbG9vcCcsIHRoaXMubGlzdCB8fCB0aGlzLm9iamVjdClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kb25lKClcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgdGhpcy5saXN0IHx8IHRoaXMub2JqZWN0LCBsZWZ0T3ZlcilcclxuICAgICAgICAgICAgLy8gdGhpcy5saXN0ID0gdGhpcy5vYmplY3QgPSBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShlbGFwc2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICBpZiAob3B0aW9ucy5wYXVzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy53YWl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9ucy53YWl0IC09IGVsYXBzZWRcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMud2FpdCA8PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGFwc2VkID0gLW9wdGlvbnMud2FpdFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy53YWl0ID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnd2FpdCcsIGVsYXBzZWQsIHRoaXMubGlzdCB8fCB0aGlzLm9iamVjdClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5maXJzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZmlyc3QnLCB0aGlzLmxpc3QgfHwgdGhpcy5vYmplY3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZSArPSBlbGFwc2VkXHJcbiAgICAgICAgbGV0IGxlZnRPdmVyID0gMFxyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvblxyXG4gICAgICAgIGxldCB0aW1lID0gdGhpcy50aW1lXHJcbiAgICAgICAgaWYgKGR1cmF0aW9uICE9PSAwICYmIHRpbWUgPiBkdXJhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxlZnRPdmVyID0gdGltZSAtIGR1cmF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRpbWUgPSBkdXJhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmb3JjZSA9IHRoaXMuY2FsY3VsYXRlKGVsYXBzZWQpXHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgZWxhcHNlZCwgdGhpcy5saXN0IHx8IHRoaXMub2JqZWN0LCB0aGlzKVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdXYWl0JyB8fCAoZHVyYXRpb24gIT09IDAgJiYgdGltZSA9PT0gZHVyYXRpb24pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kKGxlZnRPdmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9yY2UgfHwgdGltZSA9PT0gZHVyYXRpb25cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb3JyZWN0IGNlcnRhaW4gRE9NIHZhbHVlc1xyXG4gICAgX2NvcnJlY3RET00oa2V5LCB2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChpc05hTih2YWx1ZSkpID8gMSA6IHZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHJldmVyc2UoKSB7fVxyXG4gICAgY2FsY3VsYXRlKCkgeyB9XHJcbiAgICBkb25lKCkgeyB9XHJcbn0iXX0=