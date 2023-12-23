import { Card } from "./Card";

export class CardPile {
    constructor(
        public id: number = 0,
        public card: Card,
        public health: number = 0,
        public attack: number = 0,
    ) { }
}