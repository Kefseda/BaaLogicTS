//это контроллер из MVC
//ловит события, вызывает методы модели

import Konva from "konva";
import Circuit from "../managers/circuit";
import UIManager from "../managers/ui_manager";
import ConnectionManager from "../managers/connection_manager";
import { Container } from "konva/lib/Container";
import Pin from "../components/entities/pin";
import * as components from "../components/entities/circuit_component";
import { nanoid } from 'nanoid';
import ComponentBuilder from '../managers/factories/component_builder'
import WireFactory from '../managers/factories/wire_factory';

//хранит Circuit и View


export default class Controller{
    wireFactory = new WireFactory();
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

    redrawWiresForNode(nodeId: string){
        
    }

    _bind(){

        //пин / узел
        this.stage.on('dragmove', e => {
            const pin = e.target.findAncestor('.pin', true);
            if(pin){

                //на узле могут быть проводки
                const pinModel = this.circuit.pins.get(pin.id());

                if(!pinModel) throw new Error("узел призрак. Он как-бы есть, но он не зарегистрирован");

                //1. находим id проводов в пине
                const array: string[] = [...pinModel.wires];

                //2. обновляем модели (пина и проводов)
                this.circuit.moveComponent(pin.id(), pin.x(), pin.y());

                for(const id of array){
                    const wire = this.circuit.wires.get(id);
                    
                    if(wire === undefined)
                        continue;

                    //this.circuit.moveComponent(id, pin.x(), pin.y());
                    //а как понять какой конец?!?!?!?
                }

                //3. обновляем точки проводов в представлении
                for(const id of array){
                    //this.view.redrawWire(id, ); достаем позицию из модели
                }
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

                    this.createWire(this.selectedPin, pin);
                    this.selectedPin = null;
                }
            }
        })
    }

    //getWiresForPin(pinId: string) : string[]{
    //    return [...Circuit(this.p)];
    //}

    //разбить на пины и лог элементы 2 метода
    createComponent(type: components.ElementType, xPos: number, yPos: number, name: 'pin' | 'not' | 'and' | 'or') {
        var viewComponent;
        var modelComponent;
        
        var id : string = nanoid();

        switch(type){
            case components.ElementType.Pin:
                viewComponent = new Pin(id, 10,10);
                viewComponent.draggable(true);
                
                let pin : components.PinModel = { 
                    id: id, 
                    xPos: xPos, 
                    yPos: yPos, 
                    type: type, 
                    value: components.SignalType.undefined,
                    kind: components.PinType.UnOwned,
                    wires: new Set()

                };

                modelComponent = pin;
                break;

            case components.ElementType.Input:
                viewComponent = new ComponentBuilder(this.circuit).changeTriangleShape().addOutputs(1).getResult();
                
                let input : components.BaseComponent = { 
                    id: id,
                    xPos: xPos, 
                    yPos: yPos, 
                    type: type
                };

                modelComponent = input;
                break;

            case components.ElementType.Output:
                viewComponent = new ComponentBuilder(this.circuit).changeTriangleShape().addInputs(1).getResult();

                let ouput : components.BaseComponent = { 
                    id: id, 
                    xPos: xPos, 
                    yPos: yPos, 
                    type: type
                };

                modelComponent = ouput;
                break;

            case components.ElementType.LogicElement:
                //найти его из базы
                viewComponent = new ComponentBuilder(this.circuit).changeQuadShape().getResult();

                let element : components.ElementModel = { 
                    id: id,
                    operation: components.BooleanOperation.NONE,
                    xPos: xPos, 
                    yPos: yPos,
                    type: type
                };

                modelComponent = element;

                break;
            
            case components.ElementType.Custom:
                //найти его из базы
                viewComponent = new ComponentBuilder(this.circuit).changeQuadShape().getResult();

                let custom : components.ElementModel = { 
                    id: id,
                    operation: components.BooleanOperation.NONE,
                    xPos: xPos, 
                    yPos: yPos,
                    type: type
                };

                modelComponent = custom;

                break;
        }


        this.circuit.addComponent(modelComponent);
        this.view.drawComponent(viewComponent);
    }

    //как регистрировать зависимые пины?
    createPin(){

    }

    createWire(node1: any, node2: any){
        var absPos1 = node1.getAbsolutePosition();
        var absPos2 = node2.getAbsolutePosition();

        var wire = this.wireFactory.createwire(absPos1.x, absPos1.y, absPos2.x, absPos2.y);
        this.view.drawComponent(wire);

        var wireModel : components.WireModel = {
            id: wire.id(),
            xPos: (absPos1.x + absPos2.x) / 2,
            yPos: (absPos1.y + absPos2.y) / 2,
            pinAid: node1.id(),
            pinBid: node2.id()
        };

        this.circuit.addComponent(wireModel);
    }
    

    removeComponent(id: string){
        this.circuit.deleteComponent(id);
        this.view.wibeComponent(id);
    }
}
