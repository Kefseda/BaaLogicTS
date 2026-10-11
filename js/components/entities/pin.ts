//это узел и он может как создаваться на логических элементах так и существовать отдельно

import Konva from "konva";
import { ContainerConfig } from "konva/lib/Container";
import { Shape } from "konva/lib/Shape";

//должен быть массив из соседей? нет

export default class Pin extends Konva.Group {

    // TODO: why string??
    idPin: string
    isSelected = false

    sun = new Konva.Circle({
        x: 0,
        y: 0,
        radius: 16,
        fill: '#ffffff00'
    });
    
    skin = new Konva.Circle({
        x: 0,
        y: 0,
        radius: 8,
        fill: 'black'
    });

    constructor(id: string, config?: ContainerConfig){
        
        super(config);

        this.add(this.sun);
        this.add(this.skin);

        this.idPin = id;

        console.log('узел создан, id:', this.idPin);
    }

    inside(){
        if(!this.isSelected)
            this.set_color('yellow');
    }

    outside(){
        if(!this.isSelected)
            this.set_color('none');
    }

    unselect(){
        this.isSelected = false;
        this.set_color('none');
    }

    select(){
        this.isSelected = true;
        this.set_color('green');
    }

    // TODO: enum
    set_color(color: string){
        switch(color){
            case 'yellow':
                this.sun.fill('#f6ff00ad');
                break;
            case 'green':
                this.sun.fill('#09ff00ad');
                break;
            case 'none':
                this.sun.fill('#ffffff00');
                break;
        }
    }
}
