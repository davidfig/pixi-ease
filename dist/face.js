const Angle = require('yy-angle');
const wait = require('./wait');

/** Rotates an object to face the target */
module.exports = class face extends wait {
    /**
     * @param {object} object
     * @param {Point} target
     * @param {number} speed in radians/millisecond
     * @param {object} [options] @see {@link Wait}
     * @param {boolean} [options.keepAlive] don't stop animation when complete
     */
    constructor(object, target, speed, options) {
        options = options || {};
        super(object, options);
        this.type = 'Face';
        this.target = target;
        if (options.load) {
            this.load(options.load);
        } else {
            this.speed = speed;
        }
    }

    save() {
        if (this.options.cancel) {
            return null;
        }
        const save = super.save();
        save.speed = this.speed;
        save.keepAlive = this.options.keepAlive;
        return save;
    }

    load(load) {
        super.load(load);
        this.speed = load.speed;
        this.options.keepAlive = load.keepAlive;
    }

    calculate(elapsed) {
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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mYWNlLmpzIl0sIm5hbWVzIjpbIkFuZ2xlIiwicmVxdWlyZSIsIndhaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmFjZSIsImNvbnN0cnVjdG9yIiwib2JqZWN0IiwidGFyZ2V0Iiwic3BlZWQiLCJvcHRpb25zIiwidHlwZSIsImxvYWQiLCJzYXZlIiwiY2FuY2VsIiwia2VlcEFsaXZlIiwiY2FsY3VsYXRlIiwiZWxhcHNlZCIsImFuZ2xlIiwiYW5nbGVUd29Qb2ludHMiLCJwb3NpdGlvbiIsImRpZmZlcmVuY2UiLCJkaWZmZXJlbmNlQW5nbGVzIiwicm90YXRpb24iLCJlbWl0Iiwic2lnbiIsImRpZmZlcmVuY2VBbmdsZXNTaWduIiwiY2hhbmdlIiwiZGVsdGEiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7O0FBRUE7QUFDQUUsT0FBT0MsT0FBUCxHQUFpQixNQUFNQyxJQUFOLFNBQW1CSCxJQUFuQixDQUNqQjtBQUNJOzs7Ozs7O0FBT0FJLGdCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsS0FBNUIsRUFBbUNDLE9BQW5DLEVBQ0E7QUFDSUEsa0JBQVVBLFdBQVcsRUFBckI7QUFDQSxjQUFNSCxNQUFOLEVBQWNHLE9BQWQ7QUFDQSxhQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLGFBQUtILE1BQUwsR0FBY0EsTUFBZDtBQUNBLFlBQUlFLFFBQVFFLElBQVosRUFDQTtBQUNJLGlCQUFLQSxJQUFMLENBQVVGLFFBQVFFLElBQWxCO0FBQ0gsU0FIRCxNQUtBO0FBQ0ksaUJBQUtILEtBQUwsR0FBYUEsS0FBYjtBQUNIO0FBQ0o7O0FBRURJLFdBQ0E7QUFDSSxZQUFJLEtBQUtILE9BQUwsQ0FBYUksTUFBakIsRUFDQTtBQUNJLG1CQUFPLElBQVA7QUFDSDtBQUNELGNBQU1ELE9BQU8sTUFBTUEsSUFBTixFQUFiO0FBQ0FBLGFBQUtKLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBSSxhQUFLRSxTQUFMLEdBQWlCLEtBQUtMLE9BQUwsQ0FBYUssU0FBOUI7QUFDQSxlQUFPRixJQUFQO0FBQ0g7O0FBRURELFNBQUtBLElBQUwsRUFDQTtBQUNJLGNBQU1BLElBQU4sQ0FBV0EsSUFBWDtBQUNBLGFBQUtILEtBQUwsR0FBYUcsS0FBS0gsS0FBbEI7QUFDQSxhQUFLQyxPQUFMLENBQWFLLFNBQWIsR0FBeUJILEtBQUtHLFNBQTlCO0FBQ0g7O0FBRURDLGNBQVVDLE9BQVYsRUFDQTtBQUNJLFlBQUlDLFFBQVFsQixNQUFNbUIsY0FBTixDQUFxQixLQUFLWixNQUFMLENBQVlhLFFBQWpDLEVBQTJDLEtBQUtaLE1BQWhELENBQVo7QUFDQSxZQUFJYSxhQUFhckIsTUFBTXNCLGdCQUFOLENBQXVCSixLQUF2QixFQUE4QixLQUFLWCxNQUFMLENBQVlnQixRQUExQyxDQUFqQjtBQUNBLFlBQUlGLGVBQWUsQ0FBbkIsRUFDQTtBQUNJLGlCQUFLRyxJQUFMLENBQVUsTUFBVixFQUFrQixLQUFLakIsTUFBdkI7QUFDQSxnQkFBSSxDQUFDLEtBQUtHLE9BQUwsQ0FBYUssU0FBbEIsRUFDQTtBQUNJLHVCQUFPLElBQVA7QUFDSDtBQUNKLFNBUEQsTUFTQTtBQUNJLGdCQUFJVSxPQUFPekIsTUFBTTBCLG9CQUFOLENBQTJCUixLQUEzQixFQUFrQyxLQUFLWCxNQUFMLENBQVlnQixRQUE5QyxDQUFYO0FBQ0EsZ0JBQUlJLFNBQVMsS0FBS2xCLEtBQUwsR0FBYVEsT0FBMUI7QUFDQSxnQkFBSVcsUUFBU0QsU0FBU04sVUFBVixHQUF3QkEsVUFBeEIsR0FBcUNNLE1BQWpEO0FBQ0EsaUJBQUtwQixNQUFMLENBQVlnQixRQUFaLElBQXdCSyxRQUFRSCxJQUFoQztBQUNIO0FBQ0o7QUE5REwsQ0FEQSIsImZpbGUiOiJmYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQW5nbGUgPSByZXF1aXJlKCd5eS1hbmdsZScpXG5jb25zdCB3YWl0ID0gcmVxdWlyZSgnLi93YWl0JylcblxuLyoqIFJvdGF0ZXMgYW4gb2JqZWN0IHRvIGZhY2UgdGhlIHRhcmdldCAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBmYWNlIGV4dGVuZHMgd2FpdFxue1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1BvaW50fSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWQgaW4gcmFkaWFucy9taWxsaXNlY29uZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gQHNlZSB7QGxpbmsgV2FpdH1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmtlZXBBbGl2ZV0gZG9uJ3Qgc3RvcCBhbmltYXRpb24gd2hlbiBjb21wbGV0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCwgdGFyZ2V0LCBzcGVlZCwgb3B0aW9ucylcbiAgICB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgICAgIHN1cGVyKG9iamVjdCwgb3B0aW9ucylcbiAgICAgICAgdGhpcy50eXBlID0gJ0ZhY2UnXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0XG4gICAgICAgIGlmIChvcHRpb25zLmxvYWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9hZChvcHRpb25zLmxvYWQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jYW5jZWwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2F2ZSA9IHN1cGVyLnNhdmUoKVxuICAgICAgICBzYXZlLnNwZWVkID0gdGhpcy5zcGVlZFxuICAgICAgICBzYXZlLmtlZXBBbGl2ZSA9IHRoaXMub3B0aW9ucy5rZWVwQWxpdmVcbiAgICAgICAgcmV0dXJuIHNhdmVcbiAgICB9XG5cbiAgICBsb2FkKGxvYWQpXG4gICAge1xuICAgICAgICBzdXBlci5sb2FkKGxvYWQpXG4gICAgICAgIHRoaXMuc3BlZWQgPSBsb2FkLnNwZWVkXG4gICAgICAgIHRoaXMub3B0aW9ucy5rZWVwQWxpdmUgPSBsb2FkLmtlZXBBbGl2ZVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZShlbGFwc2VkKVxuICAgIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gQW5nbGUuYW5nbGVUd29Qb2ludHModGhpcy5vYmplY3QucG9zaXRpb24sIHRoaXMudGFyZ2V0KVxuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IEFuZ2xlLmRpZmZlcmVuY2VBbmdsZXMoYW5nbGUsIHRoaXMub2JqZWN0LnJvdGF0aW9uKVxuICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgdGhpcy5vYmplY3QpXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwQWxpdmUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzaWduID0gQW5nbGUuZGlmZmVyZW5jZUFuZ2xlc1NpZ24oYW5nbGUsIHRoaXMub2JqZWN0LnJvdGF0aW9uKVxuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IHRoaXMuc3BlZWQgKiBlbGFwc2VkXG4gICAgICAgICAgICB2YXIgZGVsdGEgPSAoY2hhbmdlID4gZGlmZmVyZW5jZSkgPyBkaWZmZXJlbmNlIDogY2hhbmdlXG4gICAgICAgICAgICB0aGlzLm9iamVjdC5yb3RhdGlvbiArPSBkZWx0YSAqIHNpZ25cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=