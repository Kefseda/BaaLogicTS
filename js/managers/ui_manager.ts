import Konva from 'konva';
import ComponentBuilder from './factories/component_builder.js'
import WireFactory from './factories/wire_factory.js';
import EventBus from '../systems/event_bus.js';
import { ElemetType } from '../components/entities/circuit_component.js';

//это будет View
//он отвечает за рисование объектов


export default class UIManager{

    wires = new WireFactory();
    layer: Konva.Layer
    bus: EventBus<any>
    shapes = new Map<number, Konva.Group>();

    //map<id, KonvaShape>

    //тут создается холст для рисования
    //constructor({doc = document} = {}){             < деструктуризация
    constructor(layer: Konva.Layer, bus: EventBus<any>){  

        // this.wires = new WireFactory();
        this.layer = layer;
        this.bus = bus;
        // this.shapes = new Map();
    }

    // TODO: enum

    drawComponent(component: { id: number, type: string }){

        switch(component.type){
            case "Pin":
                console.log('создаю узел');
                var element = new ComponentBuilder(10, 10).changeNodeShape().getResult();
                this.layer.add(element);
                this.shapes.set(component.id, element);
                break;
            case "LogicElement":
                var element = new ComponentBuilder(10, 10).changeQuadShape().getResult();
                this.layer.add(element);
                this.shapes.set(component.id, element);
                break;
            case "Switch":

                break;
            case "Lamp":

                break;
        }
    }

    createWire(node1: any, node2: any){
        var absPos1 = node1.getAbsolutePosition();
        var absPos2 = node2.getAbsolutePosition();

        var wire = this.wires.createwire(absPos1.x, absPos1.y, absPos2.x, absPos2.y);
        this.layer.add(wire);
        //this.shapes.set('', wire);
    }

    wibeComponent(id: number){

        this.shapes.delete(id);

    }
}
