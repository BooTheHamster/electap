import { BlockBase } from './blockBase';
import { BoundingBox } from 'excalibur';
import { Consts } from '../common/consts';
import { Polarity } from '../common/polarity';

export class Positive extends BlockBase {

    constructor(offsetY: number, velocity: number, bounds: BoundingBox) {
        super(offsetY, velocity, bounds, Polarity.Positive);
    }

    protected doGetFieldBounds(forceWidth: number): BoundingBox {
        const left = this.getLeft();

        return new BoundingBox(left - forceWidth, this.getTop(), left, this.getBottom());
    }

    protected getPosX(bounds: BoundingBox, blockWidth: number): number {
        return bounds.right - (blockWidth / 2);
    }

    protected drawField(ctx: CanvasRenderingContext2D, forceWidth: number, isCollide: boolean) {
        const y = this.getTop();
        const x = this.getLeft() - forceWidth;

        ctx.fillStyle = Consts.PositiveColor;
        ctx.globalAlpha = isCollide ? Consts.ActiveFieldOpacity : Consts.InvactiveFieldOpacity;
        ctx.fillRect(x, y, forceWidth, this.getHeight());
    }
}

