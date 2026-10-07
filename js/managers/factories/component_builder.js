import Pin from '/BaaLogicTS/js/components/entities/pin.js'

//помогает 'построить' логический элемент
export default class ComponentBuilder{
    constructor(xPos, yPos){
        this._component = new Konva.Group({
            x: xPos,
            y: yPos
        });

        this._component.draggable(true);
    }

    addInputs(count){
        for(var i = 0; i < count; i++){
            new Pin('123');
        }

        return this;
    }

    addOutputs(count){
        for(var i = 0; i < count; i++){
            new Pin('123');
        }

        return this;
    }

    changeNodeShape(){
        this.skin = new Pin('123');
        this._component.add(this.skin);

        return this;
    }

    changeQuadShape(){
        this.skin = new Konva.Rect({
            width: 30,
            height: 50,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
        });
        this._component.add(this.skin);

        return this;
    }

    changeTriangleShape(){

        this.skin = new Konva.Line({
            points: [15,0,-15,15,-15,-15],
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
            closed: true
        });
        this._component.add(this.skin);

        return this;
    }

    addName(name){

        return this;
    }

    getResult(){
        return this._component;
    }
}

