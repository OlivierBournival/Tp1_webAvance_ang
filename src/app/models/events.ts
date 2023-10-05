export class Events {
    constructor(
    public $type: string,
    public PlayableCardId: number,
    public PlayerId: number,
    public Events: Events[]
    
    ) {} 
  }

export class StartMatch {
  constructor(
    public $type: string,
    public Events: Events[]
  ) {}
}