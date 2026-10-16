//просто завод проводов

import Wire from '../../components/entities/wire.js';
import { nanoid } from 'nanoid';

export default class WireFactory{
    createwire(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number
    ) {
        const wire = new Wire(nanoid(), fromX, fromY, toX, toY);
        return wire;
    }
}
