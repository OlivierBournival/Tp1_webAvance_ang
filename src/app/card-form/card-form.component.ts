import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { CardAdminService } from '../Service/ServiceAdmin/card-admin.service';

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

  constructor(public dialogRef: MatDialogRef<CardFormComponent>, public service : CardAdminService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.edit(this.card);
    console.log('Formulaire soumis avec les données suivantes :', this.card);
    this.dialogRef.close();
  }

  close() {
    // Fermez le pop-up sans enregistrer les modifications
    this.dialogRef.close();
  }
}