import { PlayerBounds } from '../common/playerBounds';
import { BoundingBox } from 'excalibur';

export class BlockAndPlayerCollider {

    public static IsCollide(blockBounds: BoundingBox, playerBounds: PlayerBounds): boolean {
        return BlockAndPlayerCollider.GetBlockCollideFactor(blockBounds, playerBounds) > 0;
    }

    public static GetBlockCollideFactor(blockBounds: BoundingBox, playerBounds: PlayerBounds): number {
        const nearestX = Math.max(blockBounds.left, Math.min(playerBounds.position.x, blockBounds.right));
        const nearestY = Math.max(blockBounds.top, Math.min(playerBounds.position.y, blockBounds.bottom));

        const deltaX = playerBounds.position.x - nearestX;
        const deltaY = playerBounds.position.y - nearestY;
        const delta = deltaX * deltaX + deltaY * deltaY;
        const radius = playerBounds.radius * playerBounds.radius;

        if (delta < radius) {

            let factor = delta === 0
                ? radius
                : radius - delta;

            if (blockBounds.contains(playerBounds.position)) {
                factor += radius;
            }

            return factor;
        }

        return 0;
    }
}
