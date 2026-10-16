//это Model
//хранение данных, имения ф-ций над ними

import EventBus from "../systems/event_bus";
import * as components from "../components/entities/circuit_component";

export default class Circuit{

    inputs = new Map<string, components.BaseComponent>();
    outputs = new Map<string, components.BaseComponent>();
    elements = new Map<string, components.ElementModel>();
    pins = new Map<string, components.PinModel>();
    wires = new Map<string, components.WireModel>();

    constructor(eventBus: EventBus<unknown>){

    }

    addComponent(component: components.Component | components.WireModel){
        if(component === null) return;

        if('pinAid' in component){
            this.wires.set(component.id, component);
            return;
        }

        switch(component.type){
            case components.ElementType.Input:
                this.inputs.set(component.id, component);
                break;
            case components.ElementType.Output:
                this.outputs.set(component.id, component);
                break;
            case components.ElementType.LogicElement:
                if('operation' in component) this.elements.set(component.id, component);
                break;
            case components.ElementType.Pin:
                if('kind' in component) this.pins.set(component.id, component);
                break;
        }

        
    }

    deleteComponent(id: string, ){
        
    }

    moveComponent(id: string, x: number, y: number){
        
    }

    connect(pin1: unknown, pin2: unknown){
        
    }

    //пересчитываем сигналы в схеме
    process(){

    }
}
