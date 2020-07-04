import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { StorageKey } from 'shared/models/storage.model';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { StorageService } from 'shared/services/storage.service';

const { SHOPPING_CART_ID } = StorageKey;

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {

  cartItemCount: number;
  cart: ShoppingCart;
  shoppingCartId: string;
  subscription: Subscription;

  constructor(
    private storageService: StorageService,
    private cartService: ShoppingCartService,
    public media: MediaObserver,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    this.shoppingCartId = this.storageService.read(SHOPPING_CART_ID);

    if (this.shoppingCartId) {
      this.cart = await this.cartService.getCartById(this.shoppingCartId);
    }

    this.cartItemCount = this.cart.items.length || 0;

    this.subscription = this.cartService
      .getCartChangeEmitter()
      .subscribe((shoppingCart) => {
        this.cart = shoppingCart;
        this.cartItemCount = this.cart.items.length || 0;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
