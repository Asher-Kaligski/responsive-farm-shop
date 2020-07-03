import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  subscription: any;

  constructor(
    private cartService: ShoppingCartService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async ngOnInit() {
    this.cart = await this.cartService.getCart();

    this.subscription = this.cartService
      .getCartChangeEmitter()
      .subscribe((shoppingCart) => {
        this.cart = shoppingCart;
      });
  }

  async clearCart() {
    try {
      await this.cartService.clearCart();

      this.toastr.success(
        'All items have been successfully deleted from the shopping cart'
      );
    } catch (err) {
      let { error } = err;

      if (!error) {
        error = err;
      }

      this.toastr.error(error);
    }
  }
}
