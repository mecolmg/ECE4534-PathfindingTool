import fabric from 'fabric';

fabric.FieldObject = fabric.util.createClass(fabric.Rect, {
  type: 'fieldobject',

  initialize(options) {
    const defualtOptions = {
      originX: 'center',
      originY: 'center',
      lockScalingX: true,
      lockScalingY: true,
      rotatingPointOffset: 20,
    };
    const newOptions = Object.assign(defualtOptions, options || {});
    this.callSuper('initialize', newOptions);
  },

  _render(ctx) {
    this.callSuper('_render', ctx);
  },
});

fabric.FieldObstacle = fabric.util.createClass(fabric.Circle, {
  type: 'feildobstacle',

  initialize(options) {
    const defualtOptions = {
      originX: 'center',
      originY: 'center',
      lockScalingX: true,
      lockScalingY: true,
      rotatingPointOffset: 20,
    };
    const newOptions = Object.assign(defualtOptions, options || {});
    this.callSuper('initialize', newOptions);
  },

  _render(ctx) {
    this.callSuper('_render', ctx);
  },
});
