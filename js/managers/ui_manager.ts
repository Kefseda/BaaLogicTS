import Konva from 'konva';
import EventBus from '../systems/event_bus';
import Pin from "../components/entities/pin";
import { Group } from 'konva/lib/Group';
import Wire from '../components/entities/wire';

//это будет View
//он отвечает за рисование объектов


export default class UIManager{

    layer: Konva.Layer
    bus: EventBus<any>
    shapes = new Map<string, Konva.Node>();

    //тут создается холст для рисования
    //constructor({doc = document} = {}){             < деструктуризация
    constructor(layer: Konva.Layer, bus: EventBus<any>){  

        // this.wires = new WireFactory();
        this.layer = layer;
        this.bus = bus;
        // this.shapes = new Map();
    }

    // TODO: enum

    drawComponent(component: Konva.Group | Konva.Line){

        this.layer.add(component);
        this.shapes.set(component.id(), component);
    }

    redrawWire(wireId: string, nodeAx: number, nodeAy: number, nodeBx: number, nodeBy: number){
        var wire = this.shapes.get(wireId) as Wire;

        if(wire === undefined || wire === null) return;

        wire.points([nodeAx, nodeAy, nodeBx, nodeBy]);

        //this.layer.batchDraw();
    }

    wibeComponent(id: string){
        this.shapes.get(id)?.destroy();
        this.shapes.delete(id);

    }
}
