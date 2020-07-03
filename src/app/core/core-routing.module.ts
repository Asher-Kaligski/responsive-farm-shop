import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from '../shopping/components/products/products.component';
import { NoAccessComponent } from './components/no-access/no-access.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },

  { path: 'no-access', component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
