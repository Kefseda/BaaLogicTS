import Konva from 'konva';

//точка входа (инициализация)
import EventBus from './systems/event_bus'
import ModeManager from './managers/mode_manager'
import ConnectionManager from './managers/connection_manager'

import Controller from './systems/controller'
import Circuit from './managers/circuit'
import UIManager from './managers/ui_manager'
import Pin from './components/entities/pin';
import {ElementType} from './components/entities/circuit_component';

const eventBus = new EventBus<any>();
const modeManager = new ModeManager(eventBus);
const connectionManager = new ConnectionManager(eventBus);

const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: 600
});

const ui = new UIManager(stage, eventBus);
const circuit = new Circuit(eventBus);
const controller = new Controller(circuit, stage, ui, connectionManager);

const modeBtn = document.getElementById('mode_btn')!;
modeBtn.addEventListener('click', () => modeManager.ToggleMode());

const pinBtn = document.getElementById('pin_btn')!;
pinBtn.addEventListener('click', () => controller.createComponent(ElementType.Pin, 100, 100, 'pin'));

const notBtn = document.getElementById('not_btn')!;
notBtn.addEventListener('click', () => controller.createComponent({ id: 123, xPos: 100, yPos: 100, type: "LogicElement"}));

/*
const pinBtn = document.getElementById('pin_btn');
pinBtn.addEventListener('click', () => ui.createDynamicPin({ id: 123, xPos: 100, yPos: 100 }));

const inputBtn = document.getElementById('input_btn');
inputBtn.addEventListener('click', () => ui.createInput({ id: 123, xPos: 100, yPos: 100 }));

const notBtn = document.getElementById('not_btn');
notBtn.addEventListener('click', () => ui.createElement({ id: 123, xPos: 100, yPos: 100 }));

const andBtn = document.getElementById('and_btn');
andBtn.addEventListener('click', () => ui.createElement({ id: 123, xPos: 100, yPos: 100 }));
*/
