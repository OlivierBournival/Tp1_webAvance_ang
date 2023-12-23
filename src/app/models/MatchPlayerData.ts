import { CardPile } from "./CardPile";

export class MatchPlayerData {
    constructor(
        public id: number = 0,
        public health: number = 0,
        public playerId: number = 0,
        public cardsPile: CardPile[] = [],
        public hand: any[] = [],
        public battleField: any[] = [],
        public graveyard: any[] = []
    ) { }
}