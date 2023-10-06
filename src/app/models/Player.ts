import { Card } from "./Card";

export class Player {
    constructor(
        public Id: number = 0,
        public Name: string = "",
        public Money: number = 0,
        public IdentityUserId: string,
        public IdentityUser: any,
        public Cartes: Card[] | null = []
    ) {}
}
