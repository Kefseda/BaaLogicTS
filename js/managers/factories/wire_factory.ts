//просто завод проводов

import Wire from '../../components/entities/wire.js';
import Konva from "konva";

export default class WireFactory{
    createwire(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number
    ) {
        const wire = new Wire(fromX, fromY, toX, toY);
        return wire;
    }
}
