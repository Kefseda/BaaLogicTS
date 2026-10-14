//это Model
//хранение данных, имения ф-ций над ними

import EventBus from "../systems/event_bus";

export default class Circuit{

    inputs = new Map();
    outputs = new Map();
    elements = new Map();
    pins = new Map();

    constructor(eventBus: EventBus<unknown>){

    }

    createComponent(component: unknown){
        
    }

    deleteComponent(id: number){
        
    }

    moveComponent(id: number, x: number, y: number){
        
    }

    connect(pin1: unknown, pin2: unknown){
        
    }

    //пересчитываем сигналы в схеме
    process(){

    }
}
