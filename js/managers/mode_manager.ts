import EventBus from "../systems/event_bus";

/// есть у симулятора 2 режима
export enum GameMode {
    // составление схемы
    Edit,

    // симуляция схемы
    Run,
}


export default class ModeManager {

    // static instance: ModeManager
    
    currentMode: GameMode = GameMode.Edit

    bus: EventBus<GameMode>
    
    // только один экземпляр может существовать < удалить
    // почему???

    constructor(bus: EventBus<GameMode>){
        // if(ModeManager.instance){
        //     return ModeManager.instance;
        // }
        
        this.bus = bus;
        // this.currentMode = GameMode.Edit;
        // ModeManager.instance = this;
    }
    
    SetMode(newMode: GameMode){
        if(this.currentMode == newMode) return;

        this.currentMode = newMode;
        this.bus.emit('editor_mode', newMode);

        console.log('Режим изменен на ', this.currentMode);
    }

    ToggleMode(){
        this.SetMode(this.currentMode == GameMode.Edit ? GameMode.Run : GameMode.Edit);
    }
}
