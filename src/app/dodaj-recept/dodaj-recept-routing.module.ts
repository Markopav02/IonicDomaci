import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DodajReceptPage } from './dodaj-recept.page';

const routes: Routes = [
  {
    path: '',
    component: DodajReceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DodajReceptPageRoutingModule {}
