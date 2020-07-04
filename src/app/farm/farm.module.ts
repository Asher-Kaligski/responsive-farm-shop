import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'shared/material.module';
import { SharedModule } from 'shared/shared.module';

import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FarmProductsComponent } from './components/farm-products/farm-products.component';
import { FarmComponent } from './components/farm/farm.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FarmRoutingModule } from './farm-routing.module';
import { FarmerAuthGuard } from './services/farmer-auth-guard.service';

@NgModule({
  declarations: [
    FarmComponent,
    FarmProductsComponent,
    EditProductComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    FarmRoutingModule,
  ],
  exports: [],
  providers: [FarmerAuthGuard],
})
export class FarmModule {}