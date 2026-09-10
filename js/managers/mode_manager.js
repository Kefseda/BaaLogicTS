const GameMode = Object.freeze({
    Edit: 0,
    Run: 1
});

class ModeManager{
    
    //только один экземпляр может существовать
    constructor(bus){
        if(ModeManager.instance){
            return ModeManager.instance;
        }
        
        this.bus = bus;
        this.currentMode = GameMode.Edit;
        ModeManager.instance = this;
    }

    SetMode(newMode){
        if(this.currentMode == newMode) return;

        this.currentMode = newMode;
        this.bus.emit('editor_mode', newMode);

        console.log('Режим изменен на ', this.currentMode);
    }

    ToggleMode(){
        this.SetMode(this.currentMode == GameMode.Edit ? GameMode.Run : GameMode.Edit);
    }
}