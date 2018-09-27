import { PlayerBounds } from '../common/playerBounds';
import { BoundingBox } from 'excalibur';

export class BlockAndPlayerCollider {

    public static IsCollide(blockBounds: BoundingBox, playerBounds: PlayerBounds): boolean {
        return BlockAndPlayerCollider.GetBlockCollideFactor(blockBounds, playerBounds) > 0;
    }

    public static GetBlockCollideFactor(blockBounds: BoundingBox, playerBounds: PlayerBounds): number {
        const nearestX = Math.max(blockBounds.left, Math.min(playerBounds.x, blockBounds.right));
        const nearestY = Math.max(blockBounds.top, Math.min(playerBounds.y, blockBounds.bottom));

        const deltaX = playerBounds.x - nearestX;
        const deltaY = playerBounds.y - nearestY;
        const delta = deltaX * deltaX + deltaY * deltaY;
        const radius = playerBounds.radius * playerBounds.radius;

        if (delta < radius) {

            return delta === 0
                ? 0.1
                : delta;
        }

        return 0;
    }
}
