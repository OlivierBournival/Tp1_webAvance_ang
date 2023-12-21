import { Card } from "./Card";
import { Player } from "./Player";

export class Deck {
    public deckId: number;
    public nom: string;
    public joueur: Player;
    public cards: Card[];
    public prix?: number;
    public urlImage?: string;

    constructor(deckId: number, nom: string, joueur: Player, cards: Card[]) {
        this.deckId = deckId;
        this.nom = nom;
        this.joueur = joueur;
        this.cards = cards;
        
    }
}