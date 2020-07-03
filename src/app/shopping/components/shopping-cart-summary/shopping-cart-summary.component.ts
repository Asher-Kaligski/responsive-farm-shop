import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss'],
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cartId') cartId: string;
  shoppingCart$: Promise<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) {}
  async ngOnInit() {
    this.shoppingCart$ = this.cartService.getCartById(this.cartId);
  }
}
