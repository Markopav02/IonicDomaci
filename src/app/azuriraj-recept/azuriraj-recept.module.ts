import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AzurirajReceptPageRoutingModule } from './azuriraj-recept-routing.module';

import { AzurirajReceptPage } from './azuriraj-recept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AzurirajReceptPageRoutingModule
  ],
  declarations: [AzurirajReceptPage]
})
export class AzurirajReceptPageModule {}
