

export default class SimpleScene extends Konva.Group{
    constructor(config){
        super(config);
        
        this.sky = new Konva.Rect({
            x: 0,
            y: 0,
            width: 400,
            height: 300,
            fillLinearGradientStartPoint: {x: 200, y: 100},
            fillLinearGradientEndPoint: {x: 200, y: 300},
            fillLinearGradientColorStops: [0, '#c2ebff', 1, 'white'],
        });

        this.add(this.sky);
        
        this.grass_field = new Konva.Rect({
            x: 0,
            y: 300,
            width: 400,
            height: 100,
            fill: '#3de938'
        });
        this.add(this.grass_field);
        
        this.grass = new Konva.RegularPolygon({
            x: 50,
            y: 300,
            sides: 3,
            radius: 10,
            fill: '#23d21d'
        });
        this.add(this.grass);

        this.sun = new Konva.Circle({
            x: 200,
            y: 100,
            radius: 80,
            fillRadialGradientStartPoint: {x: 0, y: 0},
            fillRadialGradientEndPoint: {x: 0, y: 0},
            fillRadialGradientStartRadius: 20,
            fillRadialGradientEndRadius: 80,
            fillRadialGradientColorStops: [0, '#fffa6a', 1, '#ffffff00']
        });
        this.add(this.sun);
    }
}