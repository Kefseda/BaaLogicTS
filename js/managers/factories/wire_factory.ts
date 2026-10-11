//просто завод проводов

import Konva from "konva";

export default class WireFactory{
    createwire(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number
    ) {
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
