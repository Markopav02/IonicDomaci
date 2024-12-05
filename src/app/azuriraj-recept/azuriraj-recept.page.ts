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
  constructor(public modalCtrl: ModalController, private dataService: DataService) { }

  ngOnInit() {
    console.log(this.recipe); // You can access data here
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async updateRecipe() {

    await this.dataService.updateRecipe(this.recipe);
  }


}
