import Konva from "konva";
import { nanoid } from 'nanoid';

export default class Wire extends Konva.Line{
    constructor(idPin: string, xPosA: number, yPosA: number, xPosB: number, yPosB: number){
        super(
        {
            points: [xPosA, yPosA, xPosB, yPosB],
            stroke: 'black',
            name: 'wire',
            strokeWidth: 8,
            lineCap: 'round',
            lineJoin: 'round',
            id: idPin
        });
    
        console.log('провод создан, id:', this.id());
    }

    updatePoints(xPosA: number, yPosA: number, xPosB: number, yPosB: number){
        this.points([xPosA, yPosA, xPosB, yPosB]);
    }
}