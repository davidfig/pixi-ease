const PIXI = require('pixi.js');
const Events = require('eventemitter3');

const Angle = require('./angle');
const Face = require('./face');
const Load = require('./load');
const Movie = require('./movie');
const Shake = require('./shake');
const Target = require('./target');
const Tint = require('./tint');
const To = require('./to');
const Wait = require('./wait');

module.exports = class List extends Events {
    /**
     * Helper list for multiple animations
     * @param {object} [options]
     * @param {boolean} [options.noTicker] don't add the update function to PIXI.ticker
     * @param {PIXI.ticker} [options.ticker=PIXI.ticker.shared] use this PIXI.ticker for the list
     *
     * @event List#done(List) final animation completed in the list
     * @event List#each(elapsed, List) each update after eases are updated
     */
    constructor(options) {
        options = options || {};
        super();
        if (!options.noTicker) {
            const ticker = options.ticker || PIXI.ticker.shared;
            ticker.add(() => this.update(ticker.elapsedMS));
        }
        this.list = [];
        this.empty = true;
    }

    /**
     * Add animation(s) to animation list
     * @param {object|object[]...} any animation class
     * @return {object} first animation
     */
    add() {
        let first;
        for (let arg of arguments) {
            if (Array.isArray(arg)) {
                for (let entry of arg) {
                    if (!first) {
                        first = entry;
                    }
                    this.list.push(entry);
                }
            } else {
                first = arg;
                this.list.push(arg);
            }
        }
        this.empty = false;
        return first;
    }

    /**
     * remove animation(s)
     * @param {object|array} animate - the animation (or array of animations) to remove; can be null
     * @inherited from yy-loop
     */
    remove(animate) {
        const index = this.list.indexOf(animate);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    /**
     * remove all animations from list
     * @inherited from yy-loop
     */
    removeAll() {
        this.list = [];
    }

    /**
     * update frame
     * this is automatically added to PIXI.ticker unless options.noTicker is set
     * if using options.noTicker, this should be called manually
     * @param {number} elasped time in MS since last update
     */
    update(elapsed) {
        for (let i = 0, _i = this.list.length; i < _i; i++) {
            if (this.list[i].update(elapsed)) {
                this.list.splice(i, 1);
                i--;
                _i--;
            }
        }
        this.emit('each', this);
        if (this.list.length === 0 && !this.empty) {
            this.emit('done', this);
            this.empty = true;
        }
    }

    /**
     * number of animations
     * @type {number}
     */
    get count() {
        return this.list.length;
    }

    /**
     * number of active animations
     * @type {number}
     */
    get countRunning() {
        let count = 0;
        for (let entry of this.list) {
            if (!entry.pause) {
                count++;
            }
        }
        return count;
    }

    /** helper to add to the list a new Ease.to class; see Ease.to class below for parameters */
    to() {
        return this.add(new To(...arguments));
    }

    /** helper to add to the list a new Ease.angle class; see Ease.to class below for parameters */
    angle() {
        return this.add(new Angle(...arguments));
    }

    /** helper to add to the list a new Ease.face class; see Ease.to class below for parameters */
    face() {
        return this.add(new Face(...arguments));
    }

    /** helper to add to the list a new Ease.load class; see Ease.to class below for parameters */
    load() {
        return this.add(new Load(...arguments));
    }

    /** helper to add to the list a new Ease.movie class; see Ease.to class below for parameters */
    movie() {
        return this.add(new Movie(...arguments));
    }

    /** helper to add to the list a new Ease.shake class; see Ease.to class below for parameters */
    shake() {
        return this.add(new Shake(...arguments));
    }

    /** helper to add to the list a new Ease.target class; see Ease.to class below for parameters */
    target() {
        return this.add(new Target(...arguments));
    }

    /** helper to add to the list a new Ease.angle tint; see Ease.to class below for parameters */
    tint() {
        return this.add(new Tint(...arguments));
    }

    /** helper to add to the list a new Ease.wait class; see Ease.to class below for parameters */
    wait() {
        return this.add(new Wait(...arguments));
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LmpzIl0sIm5hbWVzIjpbIlBJWEkiLCJyZXF1aXJlIiwiRXZlbnRzIiwiQW5nbGUiLCJGYWNlIiwiTG9hZCIsIk1vdmllIiwiU2hha2UiLCJUYXJnZXQiLCJUaW50IiwiVG8iLCJXYWl0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkxpc3QiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJub1RpY2tlciIsInRpY2tlciIsInNoYXJlZCIsImFkZCIsInVwZGF0ZSIsImVsYXBzZWRNUyIsImxpc3QiLCJlbXB0eSIsImZpcnN0IiwiYXJnIiwiYXJndW1lbnRzIiwiQXJyYXkiLCJpc0FycmF5IiwiZW50cnkiLCJwdXNoIiwicmVtb3ZlIiwiYW5pbWF0ZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInJlbW92ZUFsbCIsImVsYXBzZWQiLCJpIiwiX2kiLCJsZW5ndGgiLCJlbWl0IiwiY291bnQiLCJjb3VudFJ1bm5pbmciLCJwYXVzZSIsInRvIiwiYW5nbGUiLCJmYWNlIiwibG9hZCIsIm1vdmllIiwic2hha2UiLCJ0YXJnZXQiLCJ0aW50Iiwid2FpdCJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsT0FBT0MsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNQyxTQUFTRCxRQUFRLGVBQVIsQ0FBZjs7QUFFQSxNQUFNRSxRQUFRRixRQUFRLFNBQVIsQ0FBZDtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsUUFBUixDQUFiO0FBQ0EsTUFBTUksT0FBT0osUUFBUSxRQUFSLENBQWI7QUFDQSxNQUFNSyxRQUFRTCxRQUFRLFNBQVIsQ0FBZDtBQUNBLE1BQU1NLFFBQVFOLFFBQVEsU0FBUixDQUFkO0FBQ0EsTUFBTU8sU0FBU1AsUUFBUSxVQUFSLENBQWY7QUFDQSxNQUFNUSxPQUFPUixRQUFRLFFBQVIsQ0FBYjtBQUNBLE1BQU1TLEtBQUtULFFBQVEsTUFBUixDQUFYO0FBQ0EsTUFBTVUsT0FBT1YsUUFBUSxRQUFSLENBQWI7O0FBRUFXLE9BQU9DLE9BQVAsR0FB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YixDQUFULENBQVA7QUFBMEM7O0FBRXBEO0FBQ0FxQixXQUFPO0FBQUUsZUFBTyxLQUFLNUIsR0FBTCxDQUFTLElBQUloQixJQUFKLENBQVMsR0FBR3VCLFNBQVosQ0FBVCxDQUFQO0FBQXlDOztBQUVsRDtBQUNBc0IsV0FBTztBQUFFLGVBQU8sS0FBSzdCLEdBQUwsQ0FBUyxJQUFJZixJQUFKLENBQVMsR0FBR3NCLFNBQVosQ0FBVCxDQUFQO0FBQXlDOztBQUVsRDtBQUNBdUIsWUFBUTtBQUFFLGVBQU8sS0FBSzlCLEdBQUwsQ0FBUyxJQUFJZCxLQUFKLENBQVUsR0FBR3FCLFNBQWIsQ0FBVCxDQUFQO0FBQTBDOztBQUVwRDtBQUNBd0IsWUFBUTtBQUFFLGVBQU8sS0FBSy9CLEdBQUwsQ0FBUyxJQUFJYixLQUFKLENBQVUsR0FBR29CLFNBQWIsQ0FBVCxDQUFQO0FBQTBDOztBQUVwRDtBQUNBeUIsYUFBUztBQUFFLGVBQU8sS0FBS2hDLEdBQUwsQ0FBUyxJQUFJWixNQUFKLENBQVcsR0FBR21CLFNBQWQsQ0FBVCxDQUFQO0FBQTJDOztBQUV0RDtBQUNBMEIsV0FBTztBQUFFLGVBQU8sS0FBS2pDLEdBQUwsQ0FBUyxJQUFJWCxJQUFKLENBQVMsR0FBR2tCLFNBQVosQ0FBVCxDQUFQO0FBQXlDOztBQUVsRDtBQUNBMkIsV0FBTztBQUFFLGVBQU8sS0FBS2xDLEdBQUwsQ0FBUyxJQUFJVCxJQUFKLENBQVMsR0FBR2dCLFNBQVosQ0FBVCxDQUFQO0FBQXlDO0FBekp0RCxDQURBIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpXHJcbmNvbnN0IEV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKVxyXG5cclxuY29uc3QgQW5nbGUgPSByZXF1aXJlKCcuL2FuZ2xlJylcclxuY29uc3QgRmFjZSA9IHJlcXVpcmUoJy4vZmFjZScpXHJcbmNvbnN0IExvYWQgPSByZXF1aXJlKCcuL2xvYWQnKVxyXG5jb25zdCBNb3ZpZSA9IHJlcXVpcmUoJy4vbW92aWUnKVxyXG5jb25zdCBTaGFrZSA9IHJlcXVpcmUoJy4vc2hha2UnKVxyXG5jb25zdCBUYXJnZXQgPSByZXF1aXJlKCcuL3RhcmdldCcpXHJcbmNvbnN0IFRpbnQgPSByZXF1aXJlKCcuL3RpbnQnKVxyXG5jb25zdCBUbyA9IHJlcXVpcmUoJy4vdG8nKVxyXG5jb25zdCBXYWl0ID0gcmVxdWlyZSgnLi93YWl0JylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTGlzdCBleHRlbmRzIEV2ZW50c1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBsaXN0IGZvciBtdWx0aXBsZSBhbmltYXRpb25zXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLm5vVGlja2VyXSBkb24ndCBhZGQgdGhlIHVwZGF0ZSBmdW5jdGlvbiB0byBQSVhJLnRpY2tlclxyXG4gICAgICogQHBhcmFtIHtQSVhJLnRpY2tlcn0gW29wdGlvbnMudGlja2VyPVBJWEkudGlja2VyLnNoYXJlZF0gdXNlIHRoaXMgUElYSS50aWNrZXIgZm9yIHRoZSBsaXN0XHJcbiAgICAgKlxyXG4gICAgICogQGV2ZW50IExpc3QjZG9uZShMaXN0KSBmaW5hbCBhbmltYXRpb24gY29tcGxldGVkIGluIHRoZSBsaXN0XHJcbiAgICAgKiBAZXZlbnQgTGlzdCNlYWNoKGVsYXBzZWQsIExpc3QpIGVhY2ggdXBkYXRlIGFmdGVyIGVhc2VzIGFyZSB1cGRhdGVkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpXHJcbiAgICB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgaWYgKCFvcHRpb25zLm5vVGlja2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgdGlja2VyID0gb3B0aW9ucy50aWNrZXIgfHwgUElYSS50aWNrZXIuc2hhcmVkXHJcbiAgICAgICAgICAgIHRpY2tlci5hZGQoKCkgPT4gdGhpcy51cGRhdGUodGlja2VyLmVsYXBzZWRNUykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdCA9IFtdXHJcbiAgICAgICAgdGhpcy5lbXB0eSA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbmltYXRpb24ocykgdG8gYW5pbWF0aW9uIGxpc3RcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fG9iamVjdFtdLi4ufSBhbnkgYW5pbWF0aW9uIGNsYXNzXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGZpcnN0IGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICBhZGQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmaXJzdFxyXG4gICAgICAgIGZvciAobGV0IGFyZyBvZiBhcmd1bWVudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBhcmcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaXJzdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZW50cnlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goZW50cnkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGFyZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnB1c2goYXJnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW1wdHkgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiBmaXJzdFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFuaW1hdGlvbihzKVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R8YXJyYXl9IGFuaW1hdGUgLSB0aGUgYW5pbWF0aW9uIChvciBhcnJheSBvZiBhbmltYXRpb25zKSB0byByZW1vdmU7IGNhbiBiZSBudWxsXHJcbiAgICAgKiBAaW5oZXJpdGVkIGZyb20geXktbG9vcFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoYW5pbWF0ZSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubGlzdC5pbmRleE9mKGFuaW1hdGUpXHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGFsbCBhbmltYXRpb25zIGZyb20gbGlzdFxyXG4gICAgICogQGluaGVyaXRlZCBmcm9tIHl5LWxvb3BcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdXBkYXRlIGZyYW1lXHJcbiAgICAgKiB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gUElYSS50aWNrZXIgdW5sZXNzIG9wdGlvbnMubm9UaWNrZXIgaXMgc2V0XHJcbiAgICAgKiBpZiB1c2luZyBvcHRpb25zLm5vVGlja2VyLCB0aGlzIHNob3VsZCBiZSBjYWxsZWQgbWFudWFsbHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbGFzcGVkIHRpbWUgaW4gTVMgc2luY2UgbGFzdCB1cGRhdGVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGVsYXBzZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIF9pID0gdGhpcy5saXN0Lmxlbmd0aDsgaSA8IF9pOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLnVwZGF0ZShlbGFwc2VkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0LnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgaS0tXHJcbiAgICAgICAgICAgICAgICBfaS0tXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KCdlYWNoJywgdGhpcylcclxuICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5lbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIHRoaXMpXHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHkgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnVtYmVyIG9mIGFuaW1hdGlvbnNcclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG51bWJlciBvZiBhY3RpdmUgYW5pbWF0aW9uc1xyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvdW50UnVubmluZygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMubGlzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZW50cnkucGF1c2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdW50KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY291bnRcclxuICAgIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLnRvIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgdG8oKSB7IHJldHVybiB0aGlzLmFkZChuZXcgVG8oLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UuYW5nbGUgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBhbmdsZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBBbmdsZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5mYWNlIGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgZmFjZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBGYWNlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLmxvYWQgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBsb2FkKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IExvYWQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UubW92aWUgY2xhc3M7IHNlZSBFYXNlLnRvIGNsYXNzIGJlbG93IGZvciBwYXJhbWV0ZXJzICovXHJcbiAgICBtb3ZpZSgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBNb3ZpZSguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS5zaGFrZSBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHNoYWtlKCkgeyByZXR1cm4gdGhpcy5hZGQobmV3IFNoYWtlKC4uLmFyZ3VtZW50cykpIH1cclxuXHJcbiAgICAvKiogaGVscGVyIHRvIGFkZCB0byB0aGUgbGlzdCBhIG5ldyBFYXNlLnRhcmdldCBjbGFzczsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHRhcmdldCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBUYXJnZXQoLi4uYXJndW1lbnRzKSkgfVxyXG5cclxuICAgIC8qKiBoZWxwZXIgdG8gYWRkIHRvIHRoZSBsaXN0IGEgbmV3IEVhc2UuYW5nbGUgdGludDsgc2VlIEVhc2UudG8gY2xhc3MgYmVsb3cgZm9yIHBhcmFtZXRlcnMgKi9cclxuICAgIHRpbnQoKSB7IHJldHVybiB0aGlzLmFkZChuZXcgVGludCguLi5hcmd1bWVudHMpKSB9XHJcblxyXG4gICAgLyoqIGhlbHBlciB0byBhZGQgdG8gdGhlIGxpc3QgYSBuZXcgRWFzZS53YWl0IGNsYXNzOyBzZWUgRWFzZS50byBjbGFzcyBiZWxvdyBmb3IgcGFyYW1ldGVycyAqL1xyXG4gICAgd2FpdCgpIHsgcmV0dXJuIHRoaXMuYWRkKG5ldyBXYWl0KC4uLmFyZ3VtZW50cykpIH1cclxufSJdfQ==