import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { StorageKey } from 'shared/models/storage.model';
import { StorageService } from 'shared/services/storage.service';

import { CrudService } from '../../core/services/crud.service';

const { SHOPPING_CART_ID } = StorageKey;

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService extends CrudService {
  endpoint = 'shoppingCarts';
  shoppingCart: ShoppingCart;
  cartChange: EventEmitter<ShoppingCart> = new EventEmitter();

  constructor(http: HttpClient, private storageService: StorageService) {
    super(http);
  }

  public async clearCart() {
    const cartId = await this.getOrCreateCartId();
    const cart = await this.deleteById('items/' + cartId);
    this.emitCartChangeEvent(cart);
    return cart;
  }
  emitCartChangeEvent(shoppingCart: ShoppingCart) {
    this.cartChange.emit(shoppingCart);
  }
  getCartChangeEmitter() {
    return this.cartChange;
  }

  private async create() {
    return await this.post({ items: [] });
  }

  public async getCart(): Promise<ShoppingCart> {
    const cartId = await this.getOrCreateCartId();
    return await this.getById(cartId);
  }
  public async getCartById(cartId): Promise<ShoppingCart> {
    return await this.getById(cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = this.storageService.read(SHOPPING_CART_ID);
    if (cartId) {
      return cartId;
    }

    const shoppingCart = await this.create();

    this.emitCartChangeEvent(shoppingCart);

    this.storageService.save(SHOPPING_CART_ID, shoppingCart._id);

    return shoppingCart._id;
  }

  public async updateCart(items) {
    const cartId = await this.getOrCreateCartId();
    const shoppingCart = await this.patchById(items, cartId);
    this.emitCartChangeEvent(shoppingCart);
    return shoppingCart;
  }
}
