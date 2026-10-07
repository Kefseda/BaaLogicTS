//это моя Model
//хранение данных, имения ф-ций над ними

export default class Circuit{
    constructor(eventBus){
        this.inputs = new Map();
        this.outputs = new Map();
        this.elements = new Map();
        this.pins = new Map();
    }

    createComponent(component){
        
    }

    deleteComponent(id){
        
    }

    moveComponent(id, x, y){
        
    }

    connect(pin1, pin2){
        
    }

    //пересчитываем сигналы в схеме
    process(){

    }
}