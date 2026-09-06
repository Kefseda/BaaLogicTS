//точка входа (инициализация)

import DragableObj from './components/simple_dragable.js'

var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);


var rectangle = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height() / 2,
    fill: 'blue'
});
layer.add(rectangle);

var grass_field = new Konva.Rect({
    x: 0,
    y: stage.height() / 2,
    width: stage.width(),
    height: stage.height() / 2,
    fill: 'green'
});
layer.add(grass_field);

var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: 'yellow'
});
layer.add(circle);

var obj = new DragableObj({x:10, y:10});
layer.add(obj);

layer.draw();

