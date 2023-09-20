import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CardAdminService } from '../Service/ServiceAdmin/card-admin.service';

@Component({
  selector: 'app-card-form-create',
  templateUrl: './card-form-create.component.html',
  styleUrls: ['./card-form-create.component.css']
})
export class CardFormCreateComponent implements OnInit {

  card = {
    id: 0,
    name: '',
    attack: 0,
    defense: 0,
    imageUrl: ''
  };

  constructor(public dialogRef: MatDialogRef<CardFormCreateComponent>,  public service : CardAdminService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.service.create(this.card)
    // Traitez ici l'enregistrement ou la mise à jour de la carte
    console.log('Formulaire soumis avec les données suivantes :', this.card);
    // Fermez le pop-up après avoir soumis le formulaire
    this.dialogRef.close();
  }

  close() {
    // Fermez le pop-up sans enregistrer les modifications
    this.dialogRef.close();
  }
}
