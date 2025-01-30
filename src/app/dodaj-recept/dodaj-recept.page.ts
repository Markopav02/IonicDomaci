import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-dodaj-recept',
  templateUrl: './dodaj-recept.page.html',
  styleUrls: ['./dodaj-recept.page.scss'],
})
export class DodajReceptPage implements OnInit {
  recipeId:number=generateRandomNumber();
  recipeImg?:String="";
  recipeNaziv?:String;
  recipeOpis?:String;
  recipeTezina?:String;
  recipeOmiljen:boolean=false;
  constructor(public modalCtrl: ModalController, private dataservice: DataService) { }

  ngOnInit() {
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async addRecipe() {
    await this.dataservice.addRecipe(
      {
        id:this.recipeId.toString(),
        naziv:this.recipeNaziv,
        opis:this.recipeOpis,
        img:this.recipeImg,
        omiljen:this.recipeOmiljen,
        tezina:this.recipeTezina,
      }
    );

  this.dismiss();
}
}
function generateRandomNumber(min: number = 1, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}