import Konva from 'konva';
import Pin from '../../components/entities/pin.js'
import { Shape } from 'konva/lib/Shape';

import { nanoid } from 'nanoid';

//помогает 'построить' логический элемент

export default class ComponentBuilder{
    #component: Konva.Group
    skin?: Shape

    constructor(xPos: number, yPos: number){
        this.#component = new Konva.Group({
            x: xPos,
            y: yPos,
        });

        this.#component.draggable(true);
    }

    addInputs(count: number){
        for(var i = 0; i < count; i++){
            new Pin(0,0);
        }

        return this;
    }

    addOutputs(count: number){
        for(var i = 0; i < count; i++){
            new Pin(0,0);
        }

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
        this.#component.add(this.skin);

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

        this.#component.add(this.skin);

        return this;
    }

    addName(name: string){

        return this;
    }

    getResult(){
        
        return this.#component;
    }
}
