import { BlockBase } from '../objects/blockBase';
import { Polarity } from '../common/polarity';

/**
 * Сервис для определения воздействующих на игрока полей.
 */
export class PlayerAffectedFieldsService {
    private _affectedBlocks: Set<BlockBase> = new Set<BlockBase>();

    public addBlock(block: BlockBase): void {
        this._affectedBlocks.add(block);
    }

    public removeBlock(block: BlockBase): void {
        this._affectedBlocks.delete(block);
    }

    public getPlayerAffectedPolarities(): Set<Polarity> {
        const result = new Set<Polarity>();

        this._affectedBlocks.forEach((block: BlockBase) => {
            result.add(block.Polarity);
        });

        return result;
    }

    public clearAll(): void {
        this._affectedBlocks.clear();
    }
}
