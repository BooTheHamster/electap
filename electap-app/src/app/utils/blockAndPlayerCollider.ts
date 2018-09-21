import { PlayerBounds } from '../common/playerBounds';
import { BoundingBox } from 'excalibur';

export class BlockAndPlayerCollider {
    public static IsCollide(blockBounds: BoundingBox, playerBounds: PlayerBounds): boolean {
        const nearestX = Math.max(blockBounds.left, Math.min(playerBounds.x, blockBounds.right));
        const nearestY = Math.max(blockBounds.top, Math.min(playerBounds.y, blockBounds.bottom));

        const deltaX = playerBounds.x - nearestX;
        const deltaY = playerBounds.y - nearestY;
        return (deltaX * deltaX + deltaY * deltaY) < (playerBounds.radius * playerBounds.radius);
    }
}
