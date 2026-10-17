import Konva from 'konva';
import EventBus from '../systems/event_bus';
import Pin from "../components/entities/pin";
import { Group } from 'konva/lib/Group';
import Wire from '../components/entities/wire';
import { Stage } from 'konva/lib/Stage';

//это будет View
//он отвечает за рисование объектов


export default class UIManager{

    wireLayer: Konva.Layer;
    layer: Konva.Layer;
    bus: EventBus<any>;
    shapes = new Map<string, Konva.Node>();

    //тут создается холст для рисования
    constructor(stage: Stage, bus: EventBus<any>){  
        this.bus = bus;
        
        this.layer = new Konva.Layer();
        stage.add(this.layer);

        this.wireLayer = new Konva.Layer();
        stage.add(this.wireLayer);
        
        this.wireLayer.moveDown();
    }

    // TODO: enum зачем?

    drawComponent(component: Konva.Group | Konva.Line){

        if(component instanceof Wire)
            this.wireLayer.add(component);
        else
            this.layer.add(component);

        this.shapes.set(component.id(), component);
    }

    redrawWire(wireId: string, nodeAx: number, nodeAy: number, nodeBx: number, nodeBy: number){
        var wire = this.shapes.get(wireId) as Wire;

        if(wire === undefined || wire === null) return;

        wire.points([nodeAx, nodeAy, nodeBx, nodeBy]);

        //this.layer.batchDraw(); < вроде как не пригодился
    }

    wibeComponent(id: string){
        this.shapes.get(id)?.destroy();
        this.shapes.delete(id);
    }
}