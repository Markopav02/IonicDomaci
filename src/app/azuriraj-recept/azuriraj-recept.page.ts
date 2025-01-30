import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, recipe } from '../service/data.service';

@Component({
  selector: 'app-azuriraj-recept',
  templateUrl: './azuriraj-recept.page.html',
  styleUrls: ['./azuriraj-recept.page.scss'],
})
export class AzurirajReceptPage implements OnInit {
  @Input() recipe: any;
  constructor(public modalCtrl: ModalController, private dataService: DataService,) { }

  ngOnInit() {
    if (!this.recipe) {
      this.recipe = {
        id: '',
        naziv: '',
        opis: '',
        tezina: '',
        omiljen: false,
        img: ''
      };
    }
    console.log(this.recipe); // You can access data here
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async updateRecipe() {
    if (!this.recipe.id) {
      console.error('Recipe ID is required for update');
      this.dismiss();
      return;
    }
    await this.dataService.updateRecipe(this.recipe);
    console.log('Recept ažuriran');
    this.dismiss();
  }


}
