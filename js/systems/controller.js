//это контроллер из MVC
//ловит события, вызывает методы модели

//хранит Circuit и View


export default class Controller{
    constructor(circuit, stage, view, wire_manager){
        
        this.circuit = circuit;
        this.view = view;
        this.stage = stage;
        this.wire_manager = wire_manager;

        this._bind();
    }

    _bind(){
        this.stage.on('dragmove', e => {
            const group = e.target;
            if(!group || !group.getParent()) return;
            
            for(const[id,nv] of this.view.shapes){
                if(nv.group === group){
                    this.circuit.moveComponent(id, group.x(), group.y());
                    break;
                }
            }
        })

        this.stage.on('mouseover', e => {
            const pin = e.target.getParent();

            if(!pin)return;

            if(this.hoveredPin === pin) return;

            //снимаем выделение с прошлого
            if(this.hoveredPin) this.hoveredPin.outside();

            this.hoveredPin = pin;

            //подсвечиваем
            this.hoveredPin.inside();
            
            //поменять курсор
            this.stage.container().style.cursor = 'pointer';
        })

        this.stage.on('mouseout', e => {
            const pin = e.target.getParent();

            if(!pin)return;

            //снимаем выделение с прошлого
            if(this.hoveredPin) this.hoveredPin.outside();

            this.hoveredPin = null;
            
            //поменять курсор
            this.stage.container().style.cursor = 'default';
        })

        this.stage.on('mousedown', e => {
            const pin = e.target.getParent();

            if(!pin)return;

            if(this.selectedPin === pin) {
                this.selectedPin.unselect();
                this.selectedPin = null;
                return;
            }

            //снимаем выделение с прошлого
            if(this.selectedPin) this.selectedPin.unselect();

            this.selectedPin = pin;

            this.selectedPin.select();
        })
    }

    addComponent(component){
        this.circuit.createComponent(component);
        this.view.drawComponent(component);
    }

    removeComponent(id){
        this.circuit.deleteComponent(id);
        this.view.wibeComponent(id);
    }
}