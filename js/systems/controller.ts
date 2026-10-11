//это контроллер из MVC
//ловит события, вызывает методы модели

import Konva from "konva";
import Circuit from "../managers/circuit";
import UIManager from "../managers/ui_manager";
import ConnectionManager from "../managers/connection_manager";
import { Container } from "konva/lib/Container";
import Pin from "../components/entities/pin";

//хранит Circuit и View


export default class Controller{
    circuit: Circuit
    stage: Konva.Stage
    view: UIManager
    wire_manager: ConnectionManager

    // hoveredPin: Container | null = null
    hoveredPin: Pin | null = null
    selectedPin: Pin | null = null

    constructor(
        circuit: Circuit,
        stage: Konva.Stage,
        view: UIManager,
        wire_manager: ConnectionManager
    ) {
        // this.selectedPin = null

        this.circuit = circuit;
        this.view = view;
        this.stage = stage;
        this.wire_manager = wire_manager;

        this._bind();
    }

    _bind(){

        //в этих обработчиках нету нормальных проверок (спасибо js)
        //ждите ошибки когда наведетесь не на узел

        // this.stage.on('dragmove', e => {
        //     const group = e.target;
        //     if(!group || !group.getParent()) return;
            
        //     for(const [id, nv] of this.view.shapes){
        //         // TYPE ERROR!
        //         if(nv.group === group){
        //             this.circuit.moveComponent(id, group.x(), group.y());
        //             break;
        //         }
        //     }
        // })

        this.stage.on('mouseover', e => {
            const pin = e.target.getParent();

            if(!pin)return;

            /// potential TYPE ERROR
            if(this.hoveredPin === pin) return;

            //снимаем выделение с прошлого
            if(this.hoveredPin) this.hoveredPin.outside();

            /// TYPE ERROR
            // this.hoveredPin = pin;

            //подсвечиваем
            this.hoveredPin?.inside();
            
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

        //обрабатываем клик
        this.stage.on('mousedown', e => {
            const pin = e.target.getParent();

            if(!pin)return;

            // if (!(pin instanceof Pin)) throw Error('пэпэ шнэйнэ вотафа?');

            if(this.selectedPin === undefined){
                //если в буфере нету узла
                pin.select();
                this.selectedPin = pin;
            } else {
                //если в буфере есть узел

                //снимаем выделение
                this.selectedPin.unselect();

                //если кликнули по буферному (тому же)
                if(this.selectedPin === pin) {
                    this.selectedPin = null;
                    return;
                }

                this.view.createWire(this.selectedPin, pin);
                this.selectedPin = null;
            }

            //this.wire_manager.connectNodes(this.selectedPin, pin);
        })
    }

    addComponent(component: {
        id: number,
        type: string,
        xPos: number,
        yPos: number,
    }) {
        this.circuit.createComponent(component);
        this.view.drawComponent(component);
    }

    removeComponent(id: number){
        this.circuit.deleteComponent(id);
        this.view.wibeComponent(id);
    }
}
