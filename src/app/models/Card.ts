import { Effect } from "./Effect";

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
export class CardMagasin {
  constructor(
    public id: number,
    public name: string,
    public attack: number,
    public defense: number,
    public imageUrl: string,
    public carteDepart: boolean,
    public price: number,
    public rarity: number,
    public mana: number,
    public description: string,
    public effet: Effect, 
  ) {}
}