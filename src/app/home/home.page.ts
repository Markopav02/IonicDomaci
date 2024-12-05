import { Component,OnInit,OnDestroy } from '@angular/core';
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
export class HomePage implements OnInit,OnDestroy{
  today: number = Date.now();
  recipes: any;
  sub: Subscription = new Subscription;
  constructor(public modalCtrl: ModalController,private dataService: DataService) {}
  ngOnInit(): void {
    this.getData();
    /*this.recipes=[
      {
        id:1,
        naziv: 'Špageti bolonjeze',
        opis: 'Ukusni špageti sa sočnim sosom od paradajza i mesa.',
        img: 'assets/images/spageti.jpg',
        tezina: 'Lako',
        omiljen:false
      },
      {
        id:2,
        naziv: 'Čokoladna torta',
        opis: 'Neodoljiva torta sa slojevima bogatog čokoladnog fila.',
        img: 'assets/images/cokoladna_torta.jpg',
        tezina: 'Teško',
        omiljen:false,
      },
      {
        id:3,
        naziv: 'Salata Cezar',
        opis: 'Osvježavajuća salata sa piletinom, krutonima i parmezanom.',
        img: 'assets/images/salata_cezar.jpg',
        tezina: 'Srednje',
        omiljen:false,
      }

    ];*/
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
      this.sub = this.dataService.getRecipes().subscribe((res) => {
      this.recipes = res;
      console.log(this.recipes);
      });
    }
    async deleteRecipe(recipe: any) {
      await this.dataService.deleteRecipe(recipe);
    }
  
}


