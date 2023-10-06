export class Match {
    constructor(
        public id: number = 0,
        public isPlayerATurn: boolean = false,
        public eventIndex: number = 0,
        public isMatchCompleted: boolean = false,
        public winnerUserId: string | null = null,
        public userAId: string,
        public userBId: string
    ) { }
}