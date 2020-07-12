import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'shared/models/order';
import { StorageKey } from 'shared/models/storage.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { StorageService } from 'shared/services/storage.service';

import { CrudService } from '../../core/services/crud.service';

const { SHOPPING_CART_ID } = StorageKey;
@Injectable({
  providedIn: 'root',
})
export class OrderService extends CrudService {
  endpoint = 'orders';

  constructor(
    http: HttpClient,
    private storageService: StorageService,
    private cartService: ShoppingCartService,
    private toastr: ToastrService
  ) {
    super(http);
  }

  async placeOrder(order) {
    try {
      const result = await this.post(order);

      this.storageService.remove(SHOPPING_CART_ID);

      await this.cartService.getCart();

      return result;
    } catch (err) {
      this.toastr.error(err.error);
    }
  }

  async getOrders(): Promise<Order[]> {
    return await this.get();
  }
}
