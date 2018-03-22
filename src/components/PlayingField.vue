<template>
  <canvas id="canvas" :width="canvas_width" :height="canvas_height"></canvas>
</template>

<script>
const fabric = require('fabric');
const _ = require('lodash');
const axios = require('axios');
require('../FieldObject');

let canvas = null;
const FEILD_WIDTH_CM = 100;
const FEILD_HEIGHT_CM = 140;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = (FEILD_HEIGHT_CM / FEILD_WIDTH_CM) * CANVAS_WIDTH;

function mod(n, m) {
  return ((n % m) + m) % m;
}

const x = val => (val * CANVAS_WIDTH) / FEILD_WIDTH_CM;
const y = val => (val * CANVAS_HEIGHT) / FEILD_HEIGHT_CM;
const xInv = val => (val * FEILD_WIDTH_CM) / CANVAS_WIDTH;
const yInv = val => (val * FEILD_HEIGHT_CM) / CANVAS_HEIGHT;
const dtor = val => mod(-(val + 270), 360) * ((Math.PI * 2) / 360);

export default {
  name: 'PlayingField',
  data() {
    return {
      canvas_width: CANVAS_WIDTH,
      canvas_height: CANVAS_HEIGHT,
    };
  },
  methods: {
    updateField: (options) => {
      const fieldMap = {
        width: FEILD_WIDTH_CM,
        height: FEILD_HEIGHT_CM,
      };
      _.each(canvas.getObjects(), (obj) => {
        fieldMap[obj.label] = {
          x: xInv(obj.left),
          y: yInv(obj.top),
          width: xInv(obj.width),
          height: yInv(obj.height),
          angle: dtor(obj.angle),
        };
        console.log(obj.label);
      });
      // axios.post('http://192.168.4.1:5000/debug', {
      //   params: { MSG_TYPE: 99 },
      //   headers: { 'Content-Type': 'application/json', SequenceId: 1 },
      //   body: JSON.stringify(fieldMap),
      // }).then((response) => {
      //   console.log(response);
      // });
      axios({
        method: 'get',
        url: 'http://192.168.4.1:5000/debug',
        params: { MSG_TYPE: 9 },
        headers: { SequenceId: 1 },
      }).then((response) => {
        console.log(response);
      });
      // this.$http.get('/').then((response) => {
      //   console.log(response);
      // });
    },
  },
  mounted() {
    canvas = new fabric.Canvas('canvas');
    const shark = new fabric.FieldObject({
      top: y(10),
      left: x(FEILD_WIDTH_CM / 2),
      width: x(10),
      height: y(10),
      angle: 180,
      fill: 'blue',
      label: 'shark',
    });
    const minnow1 = new fabric.FieldObject({
      top: y(FEILD_HEIGHT_CM - 10),
      left: x(FEILD_WIDTH_CM / 3),
      width: x(10),
      height: y(10),
      fill: 'red',
      label: 'minnow1',
    });
    const minnow2 = new fabric.FieldObject({
      top: y(FEILD_HEIGHT_CM - 10),
      left: x((FEILD_WIDTH_CM * 2) / 3),
      width: x(10),
      height: y(10),
      fill: 'green',
      label: 'minnow2',
    });
    for (let i = 1; i < 6; i += 1) {
      const obstacle = new fabric.FieldObject({
        top: y(FEILD_HEIGHT_CM / 2),
        left: x((FEILD_WIDTH_CM * i) / 6),
        width: x(10),
        height: y(20),
        fill: 'black',
        label: `obj${i}`,
      });
      canvas.add(obstacle);
    }

    canvas.add(shark, minnow1, minnow2);
    canvas.on('object:modified', this.updateField);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  border: 1px solid black;
}
</style>
