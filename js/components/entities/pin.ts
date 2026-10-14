//это узел и он может как создаваться на логических элементах так и существовать отдельно

import Konva from "konva";
import { nanoid } from 'nanoid';

//должен быть массив из соседей? нет

enum Color {
    none,
    yellow,
    green,
}

export default class Pin extends Konva.Group {

    // TODO: why string??
    isSelected: boolean = false

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

    constructor(xPos: number, yPos: number){
        super(
        {
            x: xPos,
            y: yPos,
            name: 'pin',
            id: nanoid()
        });

        this.add(this.sun);        
        this.add(this.skin);

        console.log('узел создан, id:', this.id());
    }

    inside(){
        if(!this.isSelected)
            this.set_color(Color.yellow);
    }

    outside(){
        if(!this.isSelected)
            this.set_color(Color.none);
    }

    unselect(){
        this.isSelected = false;
        this.set_color(Color.none);
    }

    select(){
        this.isSelected = true;
        this.set_color(Color.green);
    }

    // TODO: enum
    set_color(color: Color){
        switch(color){
            case Color.yellow:
                this.sun.fill('#f6ff00ad');
                break;
            case Color.green:
                this.sun.fill('#09ff00ad');
                break;
            case Color.none:
                this.sun.fill('#ffffff00');
                break;
        }
    }
}
