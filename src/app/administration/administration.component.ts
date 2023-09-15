import { Component, OnInit } from '@angular/core';
import { Card } from '../model/Card';
import { CardAdminService } from '../Service/ServiceAdmin/card-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardFormCreateComponent } from '../card-form-create/card-form-create.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  
  cardEdit : Card;
  cards : Card [] =[];
  id : Number = 0;
  name : string = "";
  attack : Number = 0;
  defense : Number = 0;
  imageUrl : string = "";
  showCardForm : boolean = false;
constructor(public service : CardAdminService, public dialog: MatDialog) {
  this.cardEdit = new Card(0, "" , 0,0, "");
}

ngOnInit(): void {
  this.GetAllCards();
}

openCardFormDialog() {
  const dialogRef = this.dialog.open(CardFormComponent, {
    width: '400px', // Vous pouvez ajuster la largeur
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog fermé');
  });
}

openCardFormCreateDialog() {
  const dialogRef = this.dialog.open(CardFormCreateComponent, {
    width: '400px', // Vous pouvez ajuster la largeur
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog fermé');
  });
}


async GetAllCards() : Promise<void> {
  this.service.GetCards().then(cards => {
    this.cards = cards;
  }).catch(error => {
    console.error('Erreur lors de la récupération des cartes :', error);
  });

  console.log(this.cards);
}

async CreateCards() : Promise<void> {
  this.CreateCards();

  this.GetAllCards();
}

async deleteCards(id : any) : Promise<void> {

  this.service.delete(id);
  this.GetAllCards();
}


}

