export class Card {
  constructor(
    public id: number,
    public name: string,
    public attack: number,
    public defense: number,
    public imageUrl: string,
    public carteDepart: boolean
  ) {}
}
