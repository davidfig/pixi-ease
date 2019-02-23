'use strict';

var Ease = {
    list: require('./list'),
    wait: require('./wait'),
    to: require('./to'),
    shake: require('./shake'),
    tint: require('./tint'),
    face: require('./face'),
    angle: require('./angle'),
    target: require('./target'),
    movie: require('./movie'),
    load: require('./load')
};

if (PIXI) {
    if (PIXI.extras) {
        PIXI.extras.Ease = Ease;
    } else {
        PIXI.extras = { Ease: Ease };
    }
}

module.exports = Ease;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJFYXNlIiwibGlzdCIsInJlcXVpcmUiLCJ3YWl0IiwidG8iLCJzaGFrZSIsInRpbnQiLCJmYWNlIiwiYW5nbGUiLCJ0YXJnZXQiLCJtb3ZpZSIsImxvYWQiLCJQSVhJIiwiZXh0cmFzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxPQUFPO0FBQ1RDLFVBQU1DLFFBQVEsUUFBUixDQURHO0FBRVRDLFVBQU1ELFFBQVEsUUFBUixDQUZHO0FBR1RFLFFBQUlGLFFBQVEsTUFBUixDQUhLO0FBSVRHLFdBQU9ILFFBQVEsU0FBUixDQUpFO0FBS1RJLFVBQU1KLFFBQVEsUUFBUixDQUxHO0FBTVRLLFVBQU1MLFFBQVEsUUFBUixDQU5HO0FBT1RNLFdBQU9OLFFBQVEsU0FBUixDQVBFO0FBUVRPLFlBQVFQLFFBQVEsVUFBUixDQVJDO0FBU1RRLFdBQU9SLFFBQVEsU0FBUixDQVRFO0FBVVRTLFVBQU1ULFFBQVEsUUFBUjtBQVZHLENBQWI7O0FBYUEsSUFBSVUsSUFBSixFQUNBO0FBQ0ksUUFBSUEsS0FBS0MsTUFBVCxFQUNBO0FBQ0lELGFBQUtDLE1BQUwsQ0FBWWIsSUFBWixHQUFtQkEsSUFBbkI7QUFDSCxLQUhELE1BS0E7QUFDSVksYUFBS0MsTUFBTCxHQUFjLEVBQUViLFVBQUYsRUFBZDtBQUNIO0FBQ0o7O0FBRURjLE9BQU9DLE9BQVAsR0FBaUJmLElBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRWFzZSA9IHtcclxuICAgIGxpc3Q6IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG4gICAgd2FpdDogcmVxdWlyZSgnLi93YWl0JyksXHJcbiAgICB0bzogcmVxdWlyZSgnLi90bycpLFxyXG4gICAgc2hha2U6IHJlcXVpcmUoJy4vc2hha2UnKSxcclxuICAgIHRpbnQ6IHJlcXVpcmUoJy4vdGludCcpLFxyXG4gICAgZmFjZTogcmVxdWlyZSgnLi9mYWNlJyksXHJcbiAgICBhbmdsZTogcmVxdWlyZSgnLi9hbmdsZScpLFxyXG4gICAgdGFyZ2V0OiByZXF1aXJlKCcuL3RhcmdldCcpLFxyXG4gICAgbW92aWU6IHJlcXVpcmUoJy4vbW92aWUnKSxcclxuICAgIGxvYWQ6IHJlcXVpcmUoJy4vbG9hZCcpXHJcbn1cclxuXHJcbmlmIChQSVhJKVxyXG57XHJcbiAgICBpZiAoUElYSS5leHRyYXMpXHJcbiAgICB7XHJcbiAgICAgICAgUElYSS5leHRyYXMuRWFzZSA9IEVhc2VcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBQSVhJLmV4dHJhcyA9IHsgRWFzZSB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRWFzZSJdfQ==