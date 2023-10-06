import { Match } from "./Match";

export class JoiningMatchData {
    constructor(
        public match: Match,
        public playerA: any,
        public playerB: any
    ) { }
}