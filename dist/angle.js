const wait = require('./wait');

/** animate object's {x, y} using an angle */
module.exports = class angle extends wait {
    /**
     * @param {object} object to animate
     * @param {number} angle in radians
     * @param {number} speed in pixels/millisecond
     * @param {number} [duration=0] in milliseconds; if 0, then continues forever
     * @param {object} [options] @see {@link Wait}
     */
    constructor(object, angle, speed, duration, options) {
        options = options || {};
        super(object, options);
        this.type = 'Angle';
        if (options.load) {
            this.load(options.load);
        } else {
            this.angle = angle;
            this.speed = speed;
            this.duration = duration || 0;
        }
    }

    save() {
        const save = super.save();
        save.angle = this.angle;
        save.speed = this.speed;
        return save;
    }

    load(load) {
        super.load(load);
        this.angle = load.angle;
        this.speed = load.speed;
    }

    get angle() {
        return this._angle;
    }
    set angle(value) {
        this._angle = value;
        this.sin = Math.sin(this._angle);
        this.cos = Math.cos(this._angle);
    }

    calculate(elapsed) {
        this.object.x += this.cos * elapsed * this.speed;
        this.object.y += this.sin * elapsed * this.speed;
    }

    reverse() {
        this.angle += Math.PI;
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbmdsZS5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJhbmdsZSIsImNvbnN0cnVjdG9yIiwib2JqZWN0Iiwic3BlZWQiLCJkdXJhdGlvbiIsIm9wdGlvbnMiLCJ0eXBlIiwibG9hZCIsInNhdmUiLCJfYW5nbGUiLCJ2YWx1ZSIsInNpbiIsIk1hdGgiLCJjb3MiLCJjYWxjdWxhdGUiLCJlbGFwc2VkIiwieCIsInkiLCJyZXZlcnNlIiwiUEkiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLE9BQU9DLFFBQVEsUUFBUixDQUFiOztBQUVBO0FBQ0FDLE9BQU9DLE9BQVAsR0FBaUIsTUFBTUMsS0FBTixTQUFvQkosSUFBcEIsQ0FDakI7QUFDSTs7Ozs7OztBQU9BSyxnQkFBWUMsTUFBWixFQUFvQkYsS0FBcEIsRUFBMkJHLEtBQTNCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsT0FBNUMsRUFDQTtBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBLGNBQU1ILE1BQU4sRUFBY0csT0FBZDtBQUNBLGFBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsWUFBSUQsUUFBUUUsSUFBWixFQUNBO0FBQ0ksaUJBQUtBLElBQUwsQ0FBVUYsUUFBUUUsSUFBbEI7QUFDSCxTQUhELE1BS0E7QUFDSSxpQkFBS1AsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsaUJBQUtHLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCQSxZQUFZLENBQTVCO0FBQ0g7QUFDSjs7QUFFREksV0FDQTtBQUNJLGNBQU1BLE9BQU8sTUFBTUEsSUFBTixFQUFiO0FBQ0FBLGFBQUtSLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBUSxhQUFLTCxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQSxlQUFPSyxJQUFQO0FBQ0g7O0FBRURELFNBQUtBLElBQUwsRUFDQTtBQUNJLGNBQU1BLElBQU4sQ0FBV0EsSUFBWDtBQUNBLGFBQUtQLEtBQUwsR0FBYU8sS0FBS1AsS0FBbEI7QUFDQSxhQUFLRyxLQUFMLEdBQWFJLEtBQUtKLEtBQWxCO0FBQ0g7O0FBRUQsUUFBSUgsS0FBSixHQUNBO0FBQ0ksZUFBTyxLQUFLUyxNQUFaO0FBQ0g7QUFDRCxRQUFJVCxLQUFKLENBQVVVLEtBQVYsRUFDQTtBQUNJLGFBQUtELE1BQUwsR0FBY0MsS0FBZDtBQUNBLGFBQUtDLEdBQUwsR0FBV0MsS0FBS0QsR0FBTCxDQUFTLEtBQUtGLE1BQWQsQ0FBWDtBQUNBLGFBQUtJLEdBQUwsR0FBV0QsS0FBS0MsR0FBTCxDQUFTLEtBQUtKLE1BQWQsQ0FBWDtBQUNIOztBQUVESyxjQUFVQyxPQUFWLEVBQ0E7QUFDSSxhQUFLYixNQUFMLENBQVljLENBQVosSUFBaUIsS0FBS0gsR0FBTCxHQUFXRSxPQUFYLEdBQXFCLEtBQUtaLEtBQTNDO0FBQ0EsYUFBS0QsTUFBTCxDQUFZZSxDQUFaLElBQWlCLEtBQUtOLEdBQUwsR0FBV0ksT0FBWCxHQUFxQixLQUFLWixLQUEzQztBQUNIOztBQUVEZSxjQUNBO0FBQ0ksYUFBS2xCLEtBQUwsSUFBY1ksS0FBS08sRUFBbkI7QUFDSDtBQTVETCxDQURBIiwiZmlsZSI6ImFuZ2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2FpdCA9IHJlcXVpcmUoJy4vd2FpdCcpXG5cbi8qKiBhbmltYXRlIG9iamVjdCdzIHt4LCB5fSB1c2luZyBhbiBhbmdsZSAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBhbmdsZSBleHRlbmRzIHdhaXRcbntcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0IHRvIGFuaW1hdGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgaW4gcmFkaWFuc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZCBpbiBwaXhlbHMvbWlsbGlzZWNvbmRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTBdIGluIG1pbGxpc2Vjb25kczsgaWYgMCwgdGhlbiBjb250aW51ZXMgZm9yZXZlclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gQHNlZSB7QGxpbmsgV2FpdH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QsIGFuZ2xlLCBzcGVlZCwgZHVyYXRpb24sIG9wdGlvbnMpXG4gICAge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgICAgICBzdXBlcihvYmplY3QsIG9wdGlvbnMpXG4gICAgICAgIHRoaXMudHlwZSA9ICdBbmdsZSdcbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkKG9wdGlvbnMubG9hZClcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkXG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb24gfHwgMFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBzYXZlID0gc3VwZXIuc2F2ZSgpXG4gICAgICAgIHNhdmUuYW5nbGUgPSB0aGlzLmFuZ2xlXG4gICAgICAgIHNhdmUuc3BlZWQgPSB0aGlzLnNwZWVkXG4gICAgICAgIHJldHVybiBzYXZlXG4gICAgfVxuXG4gICAgbG9hZChsb2FkKVxuICAgIHtcbiAgICAgICAgc3VwZXIubG9hZChsb2FkKVxuICAgICAgICB0aGlzLmFuZ2xlID0gbG9hZC5hbmdsZVxuICAgICAgICB0aGlzLnNwZWVkID0gbG9hZC5zcGVlZFxuICAgIH1cblxuICAgIGdldCBhbmdsZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5nbGVcbiAgICB9XG4gICAgc2V0IGFuZ2xlKHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fYW5nbGUgPSB2YWx1ZVxuICAgICAgICB0aGlzLnNpbiA9IE1hdGguc2luKHRoaXMuX2FuZ2xlKVxuICAgICAgICB0aGlzLmNvcyA9IE1hdGguY29zKHRoaXMuX2FuZ2xlKVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZShlbGFwc2VkKVxuICAgIHtcbiAgICAgICAgdGhpcy5vYmplY3QueCArPSB0aGlzLmNvcyAqIGVsYXBzZWQgKiB0aGlzLnNwZWVkXG4gICAgICAgIHRoaXMub2JqZWN0LnkgKz0gdGhpcy5zaW4gKiBlbGFwc2VkICogdGhpcy5zcGVlZFxuICAgIH1cblxuICAgIHJldmVyc2UoKVxuICAgIHtcbiAgICAgICAgdGhpcy5hbmdsZSArPSBNYXRoLlBJXG4gICAgfVxufSJdfQ==