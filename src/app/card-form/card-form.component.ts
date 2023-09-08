import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  card = {
    id: 0,
    name: '',
    attack: 0,
    defense: 0,
    imageUrl: ''
  };

  constructor(public dialogRef: MatDialogRef<CardFormComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Traitez ici l'enregistrement ou la mise à jour de la carte
    console.log('Formulaire soumis avec les données suivantes :', this.card);
    this.dialogRef.close();
  }

  close() {
    // Fermez le pop-up sans enregistrer les modifications
    this.dialogRef.close();
  }
}