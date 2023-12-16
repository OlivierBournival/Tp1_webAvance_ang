import { Component, OnInit } from '@angular/core';
import { Card } from '../models/Card';
import { CardsService } from '../services/cards.service';
import { DataPoint } from '../models/DataPoint';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  cards: Card[] = [];
  Commune : number = 0;
  Rare : number = 0;
  Épique : number = 0;
  Légendaire : number = 0;
  Mythique : number = 0;
  trueorfalse : boolean = false;

  dataManaPoints: DataPoint[]= [
    { label: "0", y: 0 },
  ]

  dataAttaquePoints : DataPoint[]= [
    { label: "0", y: 0 },
  ]

  dataDefensePoints : DataPoint[]= [
    { label: "0", y: 0 },
  ]

  chartRarityOptions: any;  

  chartManaOptions: any;

  chartAttaqueDefenseOptions: any;

  isDataReady: boolean = false;



  constructor (
    public cardsService: CardsService,

  ) {}

  async ngOnInit() {
    this.cards = await this.cardsService.getCardsFromPlayer();

    console.log(this.cards)

    this.cards.forEach(card => {
      switch (card.rarity) {
        case 0: //commune
          this.Commune++;
          break;
        case 1: //rare
         this.Rare++;
          break;
        case 2: //Épique
        this.Épique++
          break;
        case 3: //Légendaire
          this.Légendaire++
          break;
        case 4: //Mythique
        this.Mythique++
          break;
      }

      console.log(this.Commune)
      console.log(this.Légendaire)
     //Mana
            this.trueorfalse = false
            for (let j = 0; j < this.dataManaPoints.length; j++) {
              const data = this.dataManaPoints[j];
              

                if (parseInt(data.label) === card.mana) {
                  this.trueorfalse = true;
                  data.y++;
                }
            }
            
            if (!this.trueorfalse) {
              const newDataPoint: DataPoint = {
                label: card.mana.toString(),
                y: 1
              };
              this.dataManaPoints.push(newDataPoint);
            }
      //Attaque
      this.trueorfalse = false
      for (let j = 0; j < this.dataAttaquePoints.length; j++) {
        const data = this.dataAttaquePoints[j];
      

          if (parseInt(data.label) === card.attack) {
            this.trueorfalse = true;
            data.y++;
          }

      }
      
      if (!this.trueorfalse) {
        const newDataPoint: DataPoint = {
          label: card.attack.toString(),
          y: 1
        };
        this.dataAttaquePoints.push(newDataPoint);
      }

      //Defense
      this.trueorfalse = false
      for (let j = 0; j < this.dataDefensePoints.length; j++) {
        const data = this.dataDefensePoints[j];
      
          if (parseInt(data.label) === card.defense ) {
            this.trueorfalse = true;
            data.y++;
          }
      }
      
      if (!this.trueorfalse) {
        const newDataPoint: DataPoint = {
          label: card.defense.toString(),
          y: 1
        };
        this.dataDefensePoints.push(newDataPoint);
      }
    }
    );

    this.chartRarityOptions = {
      animationEnabled: true,
      title: {
      text: "Nombre de cartes selon la rareté"
      },
      data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###",
      dataPoints: [
        { y: this.Commune, name: "Commune" },
        { y: this.Rare, name: "Rare" },
        { y: this.Épique, name: "Épique" },
        { y: this.Légendaire, name: "Légendaire" },
        { y: this.Mythique, name: "Mythique"}
      ]
      }]
    }	
  
    this.chartManaOptions = {
      title:{
        text: "Nombre de Mana par cartes"
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
      },
      data: [{
        type: "bar",
        indexLabel: "{y}",
        yValueFormatString: "#",
        dataPoints: this.dataManaPoints
      }]
    }	
  
   this.chartAttaqueDefenseOptions = {
      animationEnabled: true,
      title: {
      text: "Attaque/Défense des cartes"
      },
      axisX: {
      labelAngle: -90
      },
      axisY: {
      },
      axisY2: {
      },
      toolTip: {
      shared: true
      },
      legend:{
      cursor:"pointer",
      itemclick: function(e: any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
        }
        else {
        e.dataSeries.visible = true;
        }
        e.chart.render();
      }
      },
      data: [{
      type: "column",	
      name: "Attaque",
      legendText: "Nombre d'attaque",
      showInLegend: true, 
      dataPoints: this.dataAttaquePoints
  
  
      }, {
      type: "column",	
      name: "Défense",
      legendText: "Nombre de défense",
      axisYType: "secondary",
      showInLegend: true,
      dataPoints: this.dataDefensePoints
  
      }]
    }
  

    console.log("terminer")
    console.log(this.dataAttaquePoints)
    console.log(this.dataDefensePoints)
    console.log(this.dataManaPoints)

    this.isDataReady = true;
  }
}
