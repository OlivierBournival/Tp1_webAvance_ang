import { Component } from '@angular/core';
import { Card } from '../model/Card';
import { CardAdminService } from '../Service/ServiceAdmin/card-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  
  cardEdit : Card;
  cards : Card [] =[
    {id: 1, name: 'scout', attack : 4,defense: 4 , imageUrl :'https://neural.love/cdn/ai-photostock/1eddfa43-6780-663c-947a-1d35f0d44870/0.jpg?Expires=1698796799&Signature=soKyPQf1CooT5ZIMqtzdMLiN51pbxifuOBqOmiMhFVAMPQJaR2i4trQgQKngTnpGLhZVqD2iUISD4nnRa0kr8i5F8xlZ9fOm1hpIlncTlUZNpHCdhgQHvoJCleurKoWgKKeuTbkngqBoBVLyJ14Tk3s4c20uqs7CscadNjOcog-EjzdxAXNg9wUOK1NGuPMwKQ7fTgEMBs2XSeN9-XDkItz65fg-KHcN-i0-RTyGjRZSD5inmz1h5RMhkONXgaWU-yRh3pb5hvsJVb2Z2MYIluQVHaEqaeLFoKw1wqxRfW077sOEe9FkiFZgV5BSAWGXJE4neun9yJlYdn48h7HgZw__&Key-Pair-Id=K2RFTOXRBNSROX' },
    {id: 2, name: 'knight', attack : 4,defense: 4 , imageUrl :'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ea3b0661-ca92-4e8b-ba01-b4dd4c0b55b6/dfxyib9-aecaf51b-9ad0-417f-b2ea-5d80e2761e0a.jpg/v1/fill/w_768,h_676,q_75,strp/cat_knight__by_burningheart97_dfxyib9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njc2IiwicGF0aCI6IlwvZlwvZWEzYjA2NjEtY2E5Mi00ZThiLWJhMDEtYjRkZDRjMGI1NWI2XC9kZnh5aWI5LWFlY2FmNTFiLTlhZDAtNDE3Zi1iMmVhLTVkODBlMjc2MWUwYS5qcGciLCJ3aWR0aCI6Ijw9NzY4In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.e0v1GeN4k_eK3V32xfMt03ZtGb8NHc2IqXxLQm_0BoM'},
    {id: 3, name: 'space', attack : 1,defense: 20 , imageUrl :'https://static.displate.com/280x392/displate/2023-02-13/f5abf339614207edf2ab038d76d69e60_cf641f1d5c6d2e65af5f36d333c6162a.jpg'},
    {id: 4, name: 'king', attack : 4,defense: 4 , imageUrl :'https://cdnb.artstation.com/p/assets/images/images/008/897/787/medium/weiss-hunt-ab8cbcd8dbb547028285e8d2d3b668f9.jpg?1515977383'},
    {id: 5, name: 'viking', attack : 4,defense: 4 , imageUrl :'https://preview.redd.it/viking-cat-v0-xtmoosuhfrna1.png?width=640&crop=smart&auto=webp&s=5296a2aa8ed180d6592ce1e7abe65d8173619f00'},
    {id: 6, name: 'hurt', attack : 1,defense: 1 , imageUrl :'https://globalnews.ca/wp-content/uploads/2023/02/BC-SPCA-injured-cat-Wilson.jpg?quality=85&strip=all'},
    {id: 7, name: 'monster', attack : 10,defense: 1 , imageUrl :'https://pbs.twimg.com/profile_images/1459726145805508612/D6qSUw8W_400x400.jpg'},
    {id: 8, name: 'priest', attack : 4,defense: 4 , imageUrl :'https://external-preview.redd.it/cat-as-a-priest-using-the-new-sdxl-0-9-v0-yRZZ_DiuHfKd_sDsSwTE9Zv66IqqLzrJdaolXonRXy4.jpg?auto=webp&s=875e5142767cb6b58de8d7da5ba7f4aa20c75d3b'},
    {id: 9, name: 'soldier', attack : 4,defense: 4 , imageUrl :'https://i.pinimg.com/originals/ef/38/6a/ef386ab449cae924321692f10dffc783.jpg'},
    {id: 10, name: 'sniper', attack : 4,defense: 4 , imageUrl :'https://i.pinimg.com/1200x/ec/e3/61/ece361b7eaf1856cd71bd39da6990b2a.jpg'},
    {id: 11, name: 'dragon', attack : 4,defense: 4 , imageUrl :'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2d7052e-4967-4f98-b017-a2bcbf7a8a8a/d86i2ic-6f26e7b5-05c4-4f01-afa4-5eec9c2ea315.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyZDcwNTJlLTQ5NjctNGY5OC1iMDE3LWEyYmNiZjdhOGE4YVwvZDg2aTJpYy02ZjI2ZTdiNS0wNWM0LTRmMDEtYWZhNC01ZWVjOWMyZWEzMTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Png98n38gSpiZcDs1ReEffrgKBSD-pQgLbyy8Q8S66c'},
    {id: 12, name: 'god', attack : 10,defense: 10 , imageUrl :'https://imagedelivery.net/x0RJTBjgra1v_IP6ikii7A/488a3ea3-b6af-4715-645e-e43a88e63e00/768w'},
    {id: 13, name: 'normal cat', attack : 4,defense: 4 , imageUrl :'https://i.pinimg.com/1200x/4e/7a/cb/4e7acb16e93bc996c96bd6f489325004.jpg'},
    {id: 14, name: 'also a cat', attack : 4,defense: 4 , imageUrl :'https://images.halloweencostumes.ca/products/23232/1-1/catnip-the-cat-mascot-costume.jpg'},
];
  id : Number = 0;
  name : string = "";
  attack : Number = 0;
  defense : Number = 0;
  imageUrl : string = "";
  showCardForm : boolean = false;
constructor(public service : CardAdminService, public dialog: MatDialog) {
  
}


openCardFormDialog() {
  const dialogRef = this.dialog.open(CardFormComponent, {
    width: '400px', // Vous pouvez ajuster la largeur
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog fermé');
  });
}


async GetAllCards() : Promise<void> {
  this.service.GetCards();

  this.cards = this.service.Cards;

}

async CreateCards() : Promise<void> {
  this.CreateCards();

  this.GetAllCards();
}

async deleteCards(id : any) : Promise<void> {

  this.service.delete(id);
  this.GetAllCards();
}

async EditCard(id : any) : Promise<void> {

  this.cardEdit = new Card(id , this.name, this.attack.valueOf() , this.defense.valueOf() , this.imageUrl);
  this.service.edit(this.cardEdit);
  this.GetAllCards();
}

}

