import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

export interface Item {
  productId: string;
  quantity: number;
}

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  isLoading = false;

  constructor(
    private cartService: ShoppingCartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }

    const item = this.shoppingCart.items.find(
      (item) => item.product._id == this.product._id
    );
    return item ? item.quantity : 0;
  }

  private async updateItemQuantity(change: number) {
    try {
      this.isLoading = true;
      const item: Item = {
        productId: this.product._id,
        quantity: this.getQuantity() + change,
      };
      this.shoppingCart = await this.cartService.updateCart(item);

      this.toastr.success('The shopping cart has been successfully updated');
    } catch (err) {
      let { error } = err;

      if (!error) {
        error = err;
      }

      this.toastr.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  removeFromCart() {
    this.updateItemQuantity(-1);
  }

  addToCart() {
    this.updateItemQuantity(1);
  }
}
