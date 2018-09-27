import { AffectedPolarity } from './../common/polarity';
import { Polarity } from '../common/polarity';

/**
 * Вычислитель скорости игрока в зависимости от воздействия полей блоков.
 */
export class PlayerVelocityCalculator {
    private static readonly BaseVelocityX = 25;

    /**
     * Вычисляет горизонтальную скорость игрока в зависимости от полярности.
     * @param affectedPolarities Список воздействующих на игрока полярностей.
     * @param playerPolarity Полярность игрока.
     * @returns Значение боковой скорости игрока.
     */
    public static calculateVelocityX(affectedPolarity: AffectedPolarity, playerPolarity: Polarity): number {

        if (affectedPolarity.polarity === Polarity.None) {
            return 0;
        }

        const velocity = this.BaseVelocityX * affectedPolarity.factor;

        if (affectedPolarity.polarity === playerPolarity) {
            switch (affectedPolarity.polarity) {
                case Polarity.Positive: {
                    return -velocity;
                }

                case Polarity.Negative: {
                    return velocity;
                }
            }
        } else {
            switch (affectedPolarity.polarity) {
                case Polarity.Positive: {
                    return velocity;
                }

                case Polarity.Negative: {
                    return -velocity;
                }
            }
        }

        return 0;
    }
}
