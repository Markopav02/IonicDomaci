import { Component,OnInit,OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DodajReceptPage } from '../dodaj-recept/dodaj-recept.page';
import { AzurirajReceptPage } from '../azuriraj-recept/azuriraj-recept.page';
//za rad sa firebase bazom podataka
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';

type recipe={
  id:number,
  img?:String,
  naziv?:String,
  opis?:String,
  tezina?:String,
  omiljen:boolean,
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy,OnChanges{
  today: number = Date.now();
  recipes: any;
  sub: Subscription = new Subscription;
  constructor(public modalCtrl: ModalController,private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }
  async goToAddPage() {
    const modal = await this.modalCtrl.create({
      component: DodajReceptPage
    })
    return await modal.present();
  }

  async goToUpdatePage(recipe: recipe) {
    const modal = await this.modalCtrl.create({
      component: AzurirajReceptPage,
      componentProps: recipe
    })
    return await modal.present(); } 
    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    async getData() {
      this.dataService.getRecipesDirect((recipes) => {
        this.recipes = recipes;
        console.log('Ažurirani recepti:', this.recipes);
      });
    
      /* Ovaj radi provereno
      this.dataService.getRecipesDirect()
      .then((recipes) => {
        this.recipes = recipes;
        console.log('Dohvaćeni recepti:', this.recipes);
      })
      .catch((error) => {
        console.error('Greška pri dohvatanju recepata:', error);
      });
  */
    }
    async deleteRecipe(recipe: any) {
      await this.dataService.deleteRecipe(recipe);
    }
  

    ngOnChanges(changes: SimpleChanges): void {
      this.getData();
    }
}


