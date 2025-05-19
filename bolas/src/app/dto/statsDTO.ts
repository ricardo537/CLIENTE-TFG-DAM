export class StatsDSDTO {
    soccer: number[];
	volleyball: number[];
	basketball: number[];
	tenis: number[];

    constructor (soccer: number[], volleyball: number[], basketball: number[], tenis: number[]) {
        this.soccer = soccer;
        this.volleyball = volleyball;
        this.basketball = basketball;
        this.tenis = tenis;
    }

    public static getVoid(): StatsDSDTO {
        const voidValue = [0,0,0];
        return new StatsDSDTO(voidValue, voidValue, voidValue, voidValue);
    }
}