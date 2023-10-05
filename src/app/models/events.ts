export class Events {
    constructor(
    public $type: string,
    public playableCardId: number,
    public playerId: number,
    public events: Events[]
    
    ) {} 
  }

export class StartMatch {
  constructor(
    public $type: string,
    public Events: Events[]
  ) {}
}