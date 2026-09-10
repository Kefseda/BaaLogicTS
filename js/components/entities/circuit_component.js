//тут должен быть класс, который будет отвечать за перетаскивание, подписку и отписку на событие смены режима редактора, 
//

export default class CircuitComponent{
    constructor(bus){
        this.bus = bus;
        this.unsubscribe = bus.on('editor_mode', this.onModeChanged.bind(this));
    }

    onModeChanged(){

    }

    remove(){
        this.unsubscribe();
        //здесь логика удаления элемента

    }
}