/**
 * Информация о позиции игрока.
 */
export class PlayerBounds {
    /**
     * Координата X позиции игрока.
     */
    public readonly x: number;

    /**
     * Координата Y позиции игрока.
     */
    public readonly y: number;

    /**
     * Радиус игрока.
     */
    public readonly radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
