import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FarmProductsComponent } from './components/farm-products/farm-products.component';
import { FarmComponent } from './components/farm/farm.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FarmerAuthGuard } from './services/farmer-auth-guard.service';

const routes: Routes = [
  {
    path: 'farm/update-farm',
    component: FarmComponent,
    canActivate: [AuthGuard, FarmerAuthGuard],
  },
  {
    path: 'farm/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, FarmerAuthGuard],
  },
  {
    path: 'farm/products/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard, FarmerAuthGuard],
  },
  {
    path: 'farm/products',
    component: FarmProductsComponent,
    canActivate: [AuthGuard, FarmerAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FarmRoutingModule {}
