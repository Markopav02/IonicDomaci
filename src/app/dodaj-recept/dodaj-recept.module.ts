import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DodajReceptPageRoutingModule } from './dodaj-recept-routing.module';

import { DodajReceptPage } from './dodaj-recept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DodajReceptPageRoutingModule
  ],
  declarations: [DodajReceptPage]
})
export class DodajReceptPageModule {}
