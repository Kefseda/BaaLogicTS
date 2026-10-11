//просто завод проводов

export default class WireFactory{
    createwire(fromX, fromY, toX, toY){
        const wire = new Konva.Line({
        points: [fromX, fromY, toX, toY],
        stroke: 'black',
        strokeWidth: 8,
        //lineCap: 'round', // Форма концов (round — скруглённые)
        //lineJoin: 'round' // Форма соединения отрезков
        });

        return wire;
    }
}