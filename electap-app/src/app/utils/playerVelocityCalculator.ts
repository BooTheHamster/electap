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
    public static calculateVelocityX(affectedPolarities: Set<Polarity>, playerPolarity: Polarity): number {

        if (affectedPolarities.size !== 1) {
            return 0;
        }

        const blockPolarity = affectedPolarities.values().next().value;

        if (blockPolarity === playerPolarity) {
            switch (blockPolarity) {
                case Polarity.Positive: {
                    return -this.BaseVelocityX;
                }

                case Polarity.Negative: {
                    return this.BaseVelocityX;
                }
            }
        } else {
            switch (blockPolarity) {
                case Polarity.Positive: {
                    return this.BaseVelocityX;
                }

                case Polarity.Negative: {
                    return -this.BaseVelocityX;
                }
            }
        }

        return 0;
    }
}
