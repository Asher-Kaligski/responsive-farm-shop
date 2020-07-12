import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from 'shared/components/user-form/user-form.component';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/users/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
