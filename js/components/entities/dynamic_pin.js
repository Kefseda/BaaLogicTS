//этот узел самостоятельный и его можно двигать 

import Pin from "/BaaLogicTS/js/components/entities/pin.js";

export default class DynamicPin extends Pin{
    constructor(config, bus){
        super(config, bus);

        this.draggable(true);
    }
}