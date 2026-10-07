import ComponentBuilder from '/BaaLogicTS/js/managers/factories/component_builder.js'

//это будет View
//он отвечает за рисование объектов


export default class UIManager{

    //map<id, KonvaShape>

    //тут создается холст для рисования
    //constructor({doc = document} = {}){             < деструктуризация
    constructor(layer, bus){  

        this.layer = layer;
        this.bus = bus;
        this.shapes = new Map();
    }

    drawComponent(component){

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

    createWire(node1, node2){
        //тут мы будем запускать фабрику
    }

    wibeComponent(id){

        this.shapes.delete(id);

    }
}