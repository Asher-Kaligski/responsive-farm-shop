import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    AdminRoutingModule,
  ],

  providers: [AdminAuthGuard],
})
export class AdminModule {}
