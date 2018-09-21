import { Actor, Engine, BoundingBox } from 'excalibur';
import { Polarity } from '../common/polarity';
import { ColorUtils } from '../utils/colorUtils';

export abstract class BlockBase extends Actor {
    private static readonly MaxHeight = 300;
    private static readonly MinHeight = 50;
    private static readonly MinWidth = 50;
    private static readonly ForceWidth = 50;

    // Ширина блока в пикселях.
    private _blockWidth: number;

    // Высота блока в пикселях.
    private _blockHeight: number;

    private _isCollide: boolean;

    public readonly Polarity: Polarity;

    public createNext: boolean;

    constructor(offsetY: number, velocity: number, bounds: BoundingBox, polarity: Polarity) {
        super();

        const maxWidth = bounds.getWidth() / 3;
        this._blockHeight = Math.floor(Math.random() * BlockBase.MaxHeight) + BlockBase.MinHeight;
        this._blockWidth = Math.floor(Math.random() * maxWidth) + BlockBase.MinWidth;
        this.setWidth(this._blockWidth);
        this.setHeight(this._blockHeight);
        this.vel.y = velocity;
        this.pos.x = this.getPosX(bounds, this._blockWidth);
        this.pos.y = (bounds.top - (this._blockHeight / 2)) + offsetY;
        this.Polarity = polarity;
    }

    public setIsCollide(isCollide: boolean): void {
        this._isCollide = isCollide;
    }

    public onInitialize(engine: Engine): void {
        this.setZIndex(1);
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        // Рисуем поле (для отладки).
        this.drawField(ctx, BlockBase.ForceWidth, this._isCollide);

        // Рисуем блок.
        this.drawBlock(ctx);
    }

    public getFieldBounds(): BoundingBox {
        return this.doGetFieldBounds(BlockBase.ForceWidth);
    }

    protected abstract doGetFieldBounds(forceWidth: number): BoundingBox;
    protected abstract drawField(ctx: CanvasRenderingContext2D, forceWidth: number, isCollide: boolean);
    protected abstract getPosX(bounds: BoundingBox, blockWidth: number): number;

    private drawBlock(ctx: CanvasRenderingContext2D) {
        const y = this.getTop();
        const x = this.getLeft();

        ctx.fillStyle = ColorUtils.colorFromPolarity(this.Polarity);
        ctx.globalAlpha = 1.0;
        ctx.fillRect(x, y, this.getWidth(), this.getHeight());
    }
}
