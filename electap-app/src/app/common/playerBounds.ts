import { Vector } from 'excalibur';

/**
 * Информация о позиции игрока.
 */
export class PlayerBounds {
    /**
     * Координаты позиции игрока.
     */
    public readonly position: Vector;

    /**
     * Радиус игрока.
     */
    public readonly radius: number;

    constructor(x: number, y: number, radius: number) {
        this.position = new Vector(x, y);
        this.radius = radius;
    }
}
