import Konva from 'konva';
import Pin from '../../components/entities/pin.js'
import Circuit from "../circuit";
import { Shape } from 'konva/lib/Shape';
import { nanoid } from 'nanoid';

//помогает контроллеру собрать сложные и многосоставные объекты
export default class ComponentBuilder{
    #component: Konva.Group
    skin?: Shape
    model: Circuit;

    constructor(model: Circuit){                //эхххх, модель
        this.#component = new Konva.Group();
        this.#component.draggable(true);

        this.model = model;
    }

    setPosition(xPos: number, yPos: number){
        this.#component.x(xPos);
        this.#component.y(yPos);
    }

    addInputs(count: number){
        for(var i = 0; i < count; i++){
            new Pin(nanoid(), 0, 0);

            //this.model.pins.set(); < реализовать
        }

        return this;
    }

    addOutputs(count: number){
        for(var i = 0; i < count; i++){
            new Pin(nanoid(), 0, 0);
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

    //достаем получившийся компонент
    getResult(){
        
        return this.#component;
    }
}
