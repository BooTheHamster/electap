import { BlockBase } from './blockBase';
import { BoundingBox } from 'excalibur';
import { Consts } from '../common/consts';
import { Polarity } from '../common/polarity';

export class Negative extends BlockBase {

    constructor(offsetY: number, velocity: number, bounds: BoundingBox) {
        super(offsetY, velocity, bounds, Polarity.Negative);
    }

    protected doGetFieldBounds(forceWidth: number): BoundingBox {
        const right = this.getRight();

        return new BoundingBox(right, this.getTop(), right + forceWidth, this.getBottom());
    }

    protected getPosX(bounds: BoundingBox, blockWidth: number): number {
        return bounds.left + (blockWidth / 2);
    }

    protected drawField(ctx: CanvasRenderingContext2D, forceWidth: number, isCollide: boolean) {
        const y = this.getTop();
        const x = this.getRight();

        ctx.fillStyle = Consts.NegativeColor;
        ctx.globalAlpha = isCollide ? Consts.ActiveFieldOpacity : Consts.InvactiveFieldOpacity;
        ctx.fillRect(x, y, forceWidth, this.getHeight());
    }
}

