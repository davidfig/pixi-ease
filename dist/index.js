const list = require('./list');

module.exports = {
    list,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsaXN0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3YWl0IiwidG8iLCJzaGFrZSIsInRpbnQiLCJmYWNlIiwiYW5nbGUiLCJ0YXJnZXQiLCJtb3ZpZSIsImxvYWQiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLE9BQU9DLFFBQVEsUUFBUixDQUFiOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JILFFBRGE7QUFFYkksVUFBTUgsUUFBUSxRQUFSLENBRk87QUFHYkksUUFBSUosUUFBUSxNQUFSLENBSFM7QUFJYkssV0FBT0wsUUFBUSxTQUFSLENBSk07QUFLYk0sVUFBTU4sUUFBUSxRQUFSLENBTE87QUFNYk8sVUFBTVAsUUFBUSxRQUFSLENBTk87QUFPYlEsV0FBT1IsUUFBUSxTQUFSLENBUE07QUFRYlMsWUFBUVQsUUFBUSxVQUFSLENBUks7QUFTYlUsV0FBT1YsUUFBUSxTQUFSLENBVE07QUFVYlcsVUFBTVgsUUFBUSxRQUFSO0FBVk8sQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBsaXN0ID0gcmVxdWlyZSgnLi9saXN0JylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbGlzdCxcclxuICAgIHdhaXQ6IHJlcXVpcmUoJy4vd2FpdCcpLFxyXG4gICAgdG86IHJlcXVpcmUoJy4vdG8nKSxcclxuICAgIHNoYWtlOiByZXF1aXJlKCcuL3NoYWtlJyksXHJcbiAgICB0aW50OiByZXF1aXJlKCcuL3RpbnQnKSxcclxuICAgIGZhY2U6IHJlcXVpcmUoJy4vZmFjZScpLFxyXG4gICAgYW5nbGU6IHJlcXVpcmUoJy4vYW5nbGUnKSxcclxuICAgIHRhcmdldDogcmVxdWlyZSgnLi90YXJnZXQnKSxcclxuICAgIG1vdmllOiByZXF1aXJlKCcuL21vdmllJyksXHJcbiAgICBsb2FkOiByZXF1aXJlKCcuL2xvYWQnKVxyXG59Il19