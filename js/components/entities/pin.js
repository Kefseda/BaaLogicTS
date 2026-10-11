//это узел и он может как создаваться на логических элементах так и существовать отдельно

//должен быть массив из соседей? нет

export default class Pin extends Konva.Group{
    constructor(id, config){
        
        super(config);

        this.sun = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 16,
            fill: '#ffffff00'
        });
        this.add(this.sun);
        
        this.skin = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 8,
            fill: 'black'
        });
        this.add(this.skin);

        this.idPin = id;

        console.log('узел создан, id:', this.idPin);
    }

    inside(){
        if(!this.isSelected) this.set_color('yellow');
    }

    outside(){
        if(!this.isSelected) this.set_color('none');
    }

    unselect(){
        this.isSelected = false;
        this.set_color('none');
    }

    select(){
        this.isSelected = true;
        this.set_color('green');
    }

    set_color(color){
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