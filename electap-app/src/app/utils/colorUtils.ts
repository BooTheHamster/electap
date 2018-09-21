import { Polarity } from '../common/polarity';
import { Consts } from '../common/consts';

export class ColorUtils {
    public static colorFromPolarity(polarity: Polarity): string {
        switch (polarity) {
            case Polarity.Positive: {
                return Consts.PositiveColor;
            }

            case Polarity.Negative: {
                return Consts.NegativeColor;
            }
        }
    }
}
