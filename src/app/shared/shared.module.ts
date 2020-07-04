import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { ProductCardComponent } from './../shopping/components/product-card/product-card.component';
import { ProductQuantityComponent } from './../shopping/components/product-quantity/product-quantity.component';
import { MaterialModule } from './material.module';
import { CategoryService } from './services/category.service';
import { FarmService } from './services/farm.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ProductCardComponent, ProductQuantityComponent],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
    FarmService,
  ],
})
export class SharedModule {}