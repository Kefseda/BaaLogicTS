//tsc app.ts

import Konva from 'konva';

var stage = new Konva.Stage({
    container: 'container', 
    width: window.innerWidth, 
    height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);

var circle = new Konva.Circle(
    {
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 70,
        fill: 'green'
    }
);

layer.add(circle);
layer.draw();