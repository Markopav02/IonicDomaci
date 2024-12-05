import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AzurirajReceptPage } from './azuriraj-recept.page';

const routes: Routes = [
  {
    path: '',
    component: AzurirajReceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AzurirajReceptPageRoutingModule {}
