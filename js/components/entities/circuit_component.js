//просто всякие структуры (struct)

export const ElemetType = Object.freeze({
    Pin: 0,
    NOT: 10,
    AND: 11,
    OR: 12,
    NAND: 13,
    NOR: 14,
    Switch: 20,
    Lamp: 30,
    Custom: 40
});

export const InputElement = {
    id,
    xPos,
    yPos,
    name: '',
    type,
    outputs: new[]
}

export const LogicElement = {
    id,
    xPos,
    yPos,
    name: '',
    type,
    inputs: new[],
    outputs: new[]
}

export const CustomElement = {
    id,
    xPos,
    yPos,
    name: '',
    type,
    subCircuit: new Map(),
    inputs: new[],
    outputs: new[]
}

export const Pin = {
    id,
    xPos,
    yPos,
    type,
    neighbours: new[],
    value: 0
}