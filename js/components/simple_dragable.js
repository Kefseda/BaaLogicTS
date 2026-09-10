//для примера объект, который можно передвигать

//const { default: Konva } = require("konva");

export default class DragableObj extends Konva.Group{
    constructor(config){
        super(config);

        this.rect = new Konva.Rect({
            width: config.width || 100,
            height: config.height || 100,
            fill: config.fill || '#0000009e',
            draggable: true
        });

        this.add(this.rect);

        //событие при перетаскивании
        this.rect.on('dragmove', (e) => {
            
        });

        //событие при наведении
        this.rect.on('dragstart', (e) => {
            this.rect.fill('green');
        });

        //событие при отведении
        this.rect.on('dragend', (e) => {
            this.rect.fill('red');
        });

        //событие при наведении
        this.rect.on('mouseenter', (e) => {
            this.rect.fill('red');
        });

        //событие при отведении
        this.rect.on('mouseleave', (e) => {
            this.rect.fill('#0000009e');
        });
    }

}