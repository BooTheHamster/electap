import { Polarity, AffectedPolarity } from '../common/polarity';
import { BlockBase } from '../objects/blockBase';

/**
 * Сервис для определения воздействующих на игрока полей.
 */
export class PlayerAffectedFieldsService {
    private _affectedBlocks: Map<BlockBase, number> = new Map<BlockBase, number>();
    private _positivePolarityFactor = 0;
    private _negativePolarityFactor = 0;

    public addBlock(block: BlockBase, affectFactor: number): void {

        this.decreaseAffectedFactor(block);
        this._affectedBlocks.set(block, affectFactor);

        switch (block.Polarity) {
            case Polarity.Positive: {
                this._positivePolarityFactor += affectFactor;
                break;
            }

            case Polarity.Negative: {
                this._negativePolarityFactor += affectFactor;
                break;
            }
        }
    }

    public removeBlock(block: BlockBase): void {

        if (!this._affectedBlocks.has(block)) {
            return;
        }

        this.decreaseAffectedFactor(block);
        this._affectedBlocks.delete(block);

        if (this._affectedBlocks.size === 0 && (this._negativePolarityFactor > 0 || this._positivePolarityFactor > 0)) {
        }
    }

    public getPlayerAffectedPolarity(): AffectedPolarity {
        const polarityFactorDelta = this._positivePolarityFactor - this._negativePolarityFactor;
        const totalFactor = this._positivePolarityFactor + this._negativePolarityFactor;
        const resultFactor = Math.abs(polarityFactorDelta) / totalFactor;

        if (polarityFactorDelta === 0) {
            return new AffectedPolarity(Polarity.None, 0);
        }

        const resultPolarity = polarityFactorDelta > 0
            ? Polarity.Positive
            : Polarity.Negative;

        return new AffectedPolarity(resultPolarity, resultFactor);
    }

    public clearAll(): void {
        this._affectedBlocks.clear();
        this._negativePolarityFactor = 0;
        this._positivePolarityFactor = 0;
    }

    private decreaseAffectedFactor(block: BlockBase) {

        if (!this._affectedBlocks.has(block)) {
            return;
        }

        const oldAffectFactor = this._affectedBlocks.get(block);

        switch (block.Polarity) {
            case Polarity.Positive: {
                this._positivePolarityFactor -= oldAffectFactor;
                break;
            }

            case Polarity.Negative: {
                this._negativePolarityFactor -= oldAffectFactor;
                break;
            }
        }
    }
}
