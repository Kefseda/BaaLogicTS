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

        this.stage.on('dragmove', e => {
            const pin = e.target.findAncestor('.pin', true);
            if(pin){
                this.circuit.moveComponent(pin.id(), pin.x(), pin.y());
            }
        })

        this.stage.on('mouseover', e => {

            const pin = e.target.findAncestor('.pin', true);
            if(pin){
                if(pin instanceof Pin == false) return;

                if(this.hoveredPin === pin) return;

                //снимаем выделение с прошлого
                if(this.hoveredPin) this.hoveredPin.outside();

                this.hoveredPin = pin;

                this.hoveredPin?.inside();

                this.stage.container().style.cursor = 'pointer';
                return;
            }
        })

        this.stage.on('mouseout', e => {

            const pin = e.target.findAncestor('.pin', true);
            if(pin){
                if(pin instanceof Pin == false) return;

                //снимаем выделение с прошлого
                if(this.hoveredPin) this.hoveredPin.outside();

                this.hoveredPin = null;
            
                this.stage.container().style.cursor = 'default';
                return;
            }
        })

        //обрабатываем клик
        this.stage.on('click', e => {

            const pin = e.target.findAncestor('.pin', true);
            if(pin){
                if(pin instanceof Pin == false) return;

                if(this.selectedPin === null){
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
            }
        })
    }

    addComponent(component: {
        id: string,
        type: string,
        xPos: number,
        yPos: number,
    }) {
        this.circuit.createComponent(component);
        this.view.drawComponent(component);
    }

    removeComponent(id: string){
        this.circuit.deleteComponent(id);
        this.view.wibeComponent(id);
    }
}
