//просто всякие структуры (struct)

export enum ElementType {
    Pin = 0,
    LogicElement = 1,
    Input = 2,
    Output = 3,
    Custom = 4
}

export enum BooleanOperation {
    NONE,
    NOT,
    AND,
    OR,
    NAND,
    NOR
}

export enum SignalType {
    OFF,
    ON,
    undefined
}

export enum PinType {
    UnOwned,
    Input,
    Output
}


export interface BaseComponent {
    id: string,
    xPos: number,
    yPos: number,
    type: ElementType
}

export type Component = BaseComponent | ElementModel | PinModel;

export interface ElementModel extends BaseComponent {
    operation: BooleanOperation
}

export interface PinModel extends BaseComponent {
    type: ElementType.Pin
    value: SignalType
    idOwner?: string
    kind: PinType
    wires: Set<string>
}

export interface WireModel {
    id: string,
    xPos: number,
    yPos: number,
    pinAid: string,
    pinBid: string
}
