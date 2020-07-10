import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { ProductCardComponent } from './../shopping/components/product-card/product-card.component';
import { ProductQuantityComponent } from './../shopping/components/product-quantity/product-quantity.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MaterialModule } from './material.module';
import { CategoryService } from './services/category.service';
import { FarmService } from './services/farm.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent, UserFormComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ProductCardComponent, ProductQuantityComponent, UserFormComponent],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
    FarmService,
    UserService
  ],
})
export class SharedModule {}
