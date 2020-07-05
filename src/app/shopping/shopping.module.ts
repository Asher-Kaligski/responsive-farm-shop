import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';

import { MaterialModule } from './../shared/material.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { FarmFilterComponent } from './components/products/farm-filter/farm-filter.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MobileFarmFilterComponent } from './components/products/mobile-farm-filter/mobile-farm-filter.component';
import { MobileProductFilterComponent } from './components/products/mobile-product-filter/mobile-product-filter.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ViewOrderComponent,
    FarmFilterComponent,
    MobileFarmFilterComponent,
    MobileProductFilterComponent
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    ShoppingRoutingModule,
  ],
})
export class ShoppingModule {}
