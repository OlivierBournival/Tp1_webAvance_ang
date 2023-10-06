import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-joindrePartieModal',
  templateUrl: './joindrePartieModal.component.html',
})
export class JoindrePartieModalComponent implements OnInit {
  @Output('closeModal') parentCloseModal: EventEmitter<any> =
    new EventEmitter();
  @Input('errorMessage') errorMessage: string = '';

  ngOnInit() {}

  closeModal() {
    this.parentCloseModal.emit();
  }
}
