export enum Polarity {
    None,
    Positive,
    Negative
}

export class AffectedPolarity {
    public readonly polarity: Polarity;

    public readonly factor: number;

    constructor(polarity: Polarity, factor: number) {
        this.polarity = polarity;
        this.factor = factor;
    }
}
