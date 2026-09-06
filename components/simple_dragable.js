//для примера объект, который можно передвигать

//const { default: Konva } = require("konva");

export default class DragableObj extends Konva.Group{
    constructor(config){
        super(config);

        this.rect = new Konva.Rect({
            width: config.width || 100,
            height: config.height || 100,
            fill: config.fill || 'red',
            draggable: true
        });

        this.add(this.rect);

        this.rect.on('dragmove', (e) => {
            //событие при перетаскивании
        });
    }

}