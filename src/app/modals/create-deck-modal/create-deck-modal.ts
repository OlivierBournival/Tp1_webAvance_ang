import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-deck-modal',
  templateUrl: './create-deck-modal.component.html',
})
export class CreateDeckModalComponent {
  @Output('closeModal') parentCloseModal: EventEmitter<any> =
    new EventEmitter();
  @Input('errorMessage') errorMessage: string = '';
  deckName: any;

  ngOnInit() {}

  closeModal() {
    this.parentCloseModal.emit();
  }
}
