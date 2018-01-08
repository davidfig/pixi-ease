const wait = require('./wait');

/**
 * animate a movie of textures
 */
module.exports = class movie extends wait {
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
    constructor(object, textures, duration, options) {
        options = options || {};
        super(object, options);
        this.type = 'Movie';
        if (Array.isArray(object)) {
            this.list = object;
            this.object = this.list[0];
        }
        if (options.load) {
            this.load(options.load);
        } else {
            this.textures = textures;
            this.duration = duration;
            this.current = 0;
            this.length = textures.length;
            this.interval = duration / this.length;
            this.isReverse = false;
            this.restart();
        }
    }

    save() {
        const save = super.save();
        save.goto = this.goto;
        save.current = this.current;
        save.length = this.length;
        save.interval = this.interval;
        return save;
    }

    load(load) {
        super.load(load);
        this.goto = load.goto;
        this.current = load.current;
        this.interval = load.current;
    }

    restart() {
        this.current = 0;
        this.time = 0;
        this.isReverse = false;
    }

    reverse() {
        this.isReverse = !this.isReverse;
    }

    calculate() {
        let index = Math.round(this.options.ease(this.time, 0, this.length - 1, this.duration));
        if (this.isReverse) {
            index = this.length - 1 - index;
        }
        if (this.list) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].texture = this.textures[index];
            }
        } else {
            this.object.texture = this.textures[index];
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb3ZpZS5qcyJdLCJuYW1lcyI6WyJ3YWl0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb3ZpZSIsImNvbnN0cnVjdG9yIiwib2JqZWN0IiwidGV4dHVyZXMiLCJkdXJhdGlvbiIsIm9wdGlvbnMiLCJ0eXBlIiwiQXJyYXkiLCJpc0FycmF5IiwibGlzdCIsImxvYWQiLCJjdXJyZW50IiwibGVuZ3RoIiwiaW50ZXJ2YWwiLCJpc1JldmVyc2UiLCJyZXN0YXJ0Iiwic2F2ZSIsImdvdG8iLCJ0aW1lIiwicmV2ZXJzZSIsImNhbGN1bGF0ZSIsImluZGV4IiwiTWF0aCIsInJvdW5kIiwiZWFzZSIsImkiLCJ0ZXh0dXJlIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxPQUFPQyxRQUFRLFFBQVIsQ0FBYjs7QUFFQTs7O0FBR0FDLE9BQU9DLE9BQVAsR0FBaUIsTUFBTUMsS0FBTixTQUFvQkosSUFBcEIsQ0FDakI7QUFDSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQUssZ0JBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCQyxRQUE5QixFQUF3Q0MsT0FBeEMsRUFDQTtBQUNJQSxrQkFBVUEsV0FBVyxFQUFyQjtBQUNBLGNBQU1ILE1BQU4sRUFBY0csT0FBZDtBQUNBLGFBQUtDLElBQUwsR0FBWSxPQUFaO0FBQ0EsWUFBSUMsTUFBTUMsT0FBTixDQUFjTixNQUFkLENBQUosRUFDQTtBQUNJLGlCQUFLTyxJQUFMLEdBQVlQLE1BQVo7QUFDQSxpQkFBS0EsTUFBTCxHQUFjLEtBQUtPLElBQUwsQ0FBVSxDQUFWLENBQWQ7QUFDSDtBQUNELFlBQUlKLFFBQVFLLElBQVosRUFDQTtBQUNJLGlCQUFLQSxJQUFMLENBQVVMLFFBQVFLLElBQWxCO0FBQ0gsU0FIRCxNQUtBO0FBQ0ksaUJBQUtQLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsaUJBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsaUJBQUtPLE9BQUwsR0FBZSxDQUFmO0FBQ0EsaUJBQUtDLE1BQUwsR0FBY1QsU0FBU1MsTUFBdkI7QUFDQSxpQkFBS0MsUUFBTCxHQUFnQlQsV0FBVyxLQUFLUSxNQUFoQztBQUNBLGlCQUFLRSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUtDLE9BQUw7QUFDSDtBQUNKOztBQUVEQyxXQUNBO0FBQ0ksY0FBTUEsT0FBTyxNQUFNQSxJQUFOLEVBQWI7QUFDQUEsYUFBS0MsSUFBTCxHQUFZLEtBQUtBLElBQWpCO0FBQ0FELGFBQUtMLE9BQUwsR0FBZSxLQUFLQSxPQUFwQjtBQUNBSyxhQUFLSixNQUFMLEdBQWMsS0FBS0EsTUFBbkI7QUFDQUksYUFBS0gsUUFBTCxHQUFnQixLQUFLQSxRQUFyQjtBQUNBLGVBQU9HLElBQVA7QUFDSDs7QUFFRE4sU0FBS0EsSUFBTCxFQUNBO0FBQ0ksY0FBTUEsSUFBTixDQUFXQSxJQUFYO0FBQ0EsYUFBS08sSUFBTCxHQUFZUCxLQUFLTyxJQUFqQjtBQUNBLGFBQUtOLE9BQUwsR0FBZUQsS0FBS0MsT0FBcEI7QUFDQSxhQUFLRSxRQUFMLEdBQWdCSCxLQUFLQyxPQUFyQjtBQUNIOztBQUVESSxjQUNBO0FBQ0ksYUFBS0osT0FBTCxHQUFlLENBQWY7QUFDQSxhQUFLTyxJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUtKLFNBQUwsR0FBaUIsS0FBakI7QUFDSDs7QUFFREssY0FDQTtBQUNJLGFBQUtMLFNBQUwsR0FBaUIsQ0FBQyxLQUFLQSxTQUF2QjtBQUNIOztBQUVETSxnQkFDQTtBQUNJLFlBQUlDLFFBQVFDLEtBQUtDLEtBQUwsQ0FBVyxLQUFLbEIsT0FBTCxDQUFhbUIsSUFBYixDQUFrQixLQUFLTixJQUF2QixFQUE2QixDQUE3QixFQUFnQyxLQUFLTixNQUFMLEdBQWMsQ0FBOUMsRUFBaUQsS0FBS1IsUUFBdEQsQ0FBWCxDQUFaO0FBQ0EsWUFBSSxLQUFLVSxTQUFULEVBQ0E7QUFDSU8sb0JBQVEsS0FBS1QsTUFBTCxHQUFjLENBQWQsR0FBa0JTLEtBQTFCO0FBQ0g7QUFDRCxZQUFJLEtBQUtaLElBQVQsRUFDQTtBQUNJLGlCQUFLLElBQUlnQixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2hCLElBQUwsQ0FBVUcsTUFBOUIsRUFBc0NhLEdBQXRDLEVBQ0E7QUFDSSxxQkFBS2hCLElBQUwsQ0FBVWdCLENBQVYsRUFBYUMsT0FBYixHQUF1QixLQUFLdkIsUUFBTCxDQUFja0IsS0FBZCxDQUF2QjtBQUNIO0FBQ0osU0FORCxNQVFBO0FBQ0ksaUJBQUtuQixNQUFMLENBQVl3QixPQUFaLEdBQXNCLEtBQUt2QixRQUFMLENBQWNrQixLQUFkLENBQXRCO0FBQ0g7QUFDSjtBQTlGTCxDQURBIiwiZmlsZSI6Im1vdmllLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2FpdCA9IHJlcXVpcmUoJy4vd2FpdCcpXG5cbi8qKlxuICogYW5pbWF0ZSBhIG1vdmllIG9mIHRleHR1cmVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgbW92aWUgZXh0ZW5kcyB3YWl0XG57XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCB0byBhbmltYXRlXG4gICAgICogQHBhcmFtIHtQSVhJLlRleHR1cmVbXX0gdGV4dHVyZXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTBdIHRpbWUgdG8gcnVuICh1c2UgMCBmb3IgaW5maW5pdGUgZHVyYXRpb24tLXNob3VsZCBvbmx5IGJlIHVzZWQgd2l0aCBjdXN0b21pemVkIGVhc2luZyBmdW5jdGlvbnMpXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy53YWl0PTBdIG4gbWlsbGlzZWNvbmRzIGJlZm9yZSBzdGFydGluZyBhbmltYXRpb24gKGNhbiBhbHNvIGJlIHVzZWQgdG8gcGF1c2UgYW5pbWF0aW9uIGZvciBhIGxlbmd0aCBvZiB0aW1lKVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucGF1c2VdIHN0YXJ0IHRoZSBhbmltYXRpb24gcGF1c2VkXG4gICAgICogQHBhcmFtIHsoYm9vbGVhbnxudW1iZXIpfSBbb3B0aW9ucy5yZXBlYXRdIHRydWU6IHJlcGVhdCBhbmltYXRpb24gZm9yZXZlciBuOiByZXBlYXQgYW5pbWF0aW9uIG4gdGltZXNcbiAgICAgKiBAcGFyYW0geyhib29sZWFufG51bWJlcil9IFtvcHRpb25zLnJldmVyc2VdIHRydWU6IHJldmVyc2UgYW5pbWF0aW9uIChpZiBjb21iaW5lZCB3aXRoIHJlcGVhdCwgdGhlbiBwdWxzZSkgbjogcmV2ZXJzZSBhbmltYXRpb24gbiB0aW1lc1xuICAgICAqIEBwYXJhbSB7KGJvb2xlYW58bnVtYmVyKX0gW29wdGlvbnMuY29udGludWVdIHRydWU6IGNvbnRpbnVlIGFuaW1hdGlvbiB3aXRoIG5ldyBzdGFydGluZyB2YWx1ZXMgbjogY29udGludWUgYW5pbWF0aW9uIG4gdGltZXNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5sb2FkXSBsb2FkcyBhbiBhbmltYXRpb24gdXNpbmcgYSAuc2F2ZSgpIG9iamVjdCBub3RlIHRoZSAqIHBhcmFtZXRlcnMgYmVsb3cgY2Fubm90IGJlIGxvYWRlZCBhbmQgbXVzdCBiZSByZS1zZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5lYXNlXSBmdW5jdGlvbiBmcm9tIGVhc2luZy5qcyAoc2VlIGh0dHA6Ly9lYXNpbmdzLm5ldCBmb3IgZXhhbXBsZXMpXG4gICAgICogQGVtaXRzIHtkb25lfSBhbmltYXRpb24gZXhwaXJlc1xuICAgICAqIEBlbWl0cyB7d2FpdH0gZWFjaCB1cGRhdGUgZHVyaW5nIGEgd2FpdFxuICAgICAqIEBlbWl0cyB7Zmlyc3R9IGZpcnN0IHVwZGF0ZSB3aGVuIGFuaW1hdGlvbiBzdGFydHNcbiAgICAgKiBAZW1pdHMge2VhY2h9IGVhY2ggdXBkYXRlIHdoaWxlIGFuaW1hdGlvbiBpcyBydW5uaW5nXG4gICAgICogQGVtaXRzIHtsb29wfSB3aGVuIGFuaW1hdGlvbiBpcyByZXBlYXRlZFxuICAgICAqIEBlbWl0cyB7cmV2ZXJzZX0gd2hlbiBhbmltYXRpb24gaXMgcmV2ZXJzZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QsIHRleHR1cmVzLCBkdXJhdGlvbiwgb3B0aW9ucylcbiAgICB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgICAgIHN1cGVyKG9iamVjdCwgb3B0aW9ucylcbiAgICAgICAgdGhpcy50eXBlID0gJ01vdmllJ1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMub2JqZWN0ID0gdGhpcy5saXN0WzBdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMubG9hZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkKG9wdGlvbnMubG9hZClcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZXMgPSB0ZXh0dXJlc1xuICAgICAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRleHR1cmVzLmxlbmd0aFxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGR1cmF0aW9uIC8gdGhpcy5sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuaXNSZXZlcnNlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMucmVzdGFydCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHNhdmUgPSBzdXBlci5zYXZlKClcbiAgICAgICAgc2F2ZS5nb3RvID0gdGhpcy5nb3RvXG4gICAgICAgIHNhdmUuY3VycmVudCA9IHRoaXMuY3VycmVudFxuICAgICAgICBzYXZlLmxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgICAgIHNhdmUuaW50ZXJ2YWwgPSB0aGlzLmludGVydmFsXG4gICAgICAgIHJldHVybiBzYXZlXG4gICAgfVxuXG4gICAgbG9hZChsb2FkKVxuICAgIHtcbiAgICAgICAgc3VwZXIubG9hZChsb2FkKVxuICAgICAgICB0aGlzLmdvdG8gPSBsb2FkLmdvdG9cbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbG9hZC5jdXJyZW50XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBsb2FkLmN1cnJlbnRcbiAgICB9XG5cbiAgICByZXN0YXJ0KClcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgICAgdGhpcy50aW1lID0gMFxuICAgICAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgcmV2ZXJzZSgpXG4gICAge1xuICAgICAgICB0aGlzLmlzUmV2ZXJzZSA9ICF0aGlzLmlzUmV2ZXJzZVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZSgpXG4gICAge1xuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLnJvdW5kKHRoaXMub3B0aW9ucy5lYXNlKHRoaXMudGltZSwgMCwgdGhpcy5sZW5ndGggLSAxLCB0aGlzLmR1cmF0aW9uKSlcbiAgICAgICAgaWYgKHRoaXMuaXNSZXZlcnNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubGVuZ3RoIC0gMSAtIGluZGV4XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGlzdClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0W2ldLnRleHR1cmUgPSB0aGlzLnRleHR1cmVzW2luZGV4XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5vYmplY3QudGV4dHVyZSA9IHRoaXMudGV4dHVyZXNbaW5kZXhdXG4gICAgICAgIH1cbiAgICB9XG59Il19