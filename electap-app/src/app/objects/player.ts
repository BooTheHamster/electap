import { Actor, BoundingBox, Engine } from 'excalibur';
import { Consts } from '../common/consts';
import { PlayerBounds } from '../common/playerBounds';
import { Polarity } from '../common/polarity';
import { ColorUtils } from '../utils/colorUtils';

export class Player extends Actor {
    private static readonly PlayerRadius = 25;
    private static readonly PlayerBorderWidth = 2;

    public Polarity: Polarity = Polarity.Positive;

    constructor(velocity: number, bounds: BoundingBox) {
        super();

        this.setWidth(Player.PlayerRadius * 2);
        this.setHeight(this.getWidth());
        this.pos.x = bounds.getWidth() / 2;
        this.vel.y = velocity;
        this.pos.y = bounds.getHeight() + this.getHeight();
    }

    public onInitialize(engine: Engine): void {
        this.setZIndex(10);
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        const color = ColorUtils.colorFromPolarity(this.Polarity);

        ctx.beginPath();
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = Consts.GameBackgroundColor;
        ctx.arc(this.pos.x, this.pos.y, Player.PlayerRadius + Player.PlayerBorderWidth, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = Player.PlayerBorderWidth;
        ctx.stroke();
    }

    public getPlayerBounds(): PlayerBounds {
        return new PlayerBounds(this.pos.x, this.pos.y, Player.PlayerRadius);
    }

    public invertPolarity(): void {
        if (this.Polarity === Polarity.Negative) {
            this.Polarity = Polarity.Positive;
            return;
        }

        if (this.Polarity === Polarity.Positive) {
            this.Polarity = Polarity.Negative;
            return;
        }
    }
}
