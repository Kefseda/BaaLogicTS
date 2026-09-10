//точка входа (инициализация)

import DragableObj from '/BaaLogicTS/js/components/simple_dragable.js'
import SimpleScene from '/BaaLogicTS/js/components/simple_scene.js'

var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

var layer = new Konva.Layer();
stage.add(layer);

var scene = new SimpleScene();
layer.add(scene);

var obj = new DragableObj({x:10, y:10});
layer.add(obj);

layer.draw();

