import { ShoppingCartItem } from './../models/shopping-cart-item';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { CrudService } from '../../core/services/crud.service';

export interface FarmOrder {
  datePlaced: string;
  items: ShoppingCartItem[];
  productIds: string[];
  timeInterval?: any;
}

@Injectable({
  providedIn: 'root',
})
export class FarmService extends CrudService {
  endpoint = 'farms';
  farmOrder: FarmOrder;

  constructor(http: HttpClient) {
    super(http);
  }

  setFarmOrder(order: FarmOrder) {
    this.farmOrder = order;
  }
  getFarmOrder() {
    return this.farmOrder;
  }

  async update(farm, farmId) {
    return await this.putById(farm, farmId);
  }

  async create(farm) {
    return await this.post(farm);
  }

  async getByFarmOwner(farmOwnerId) {
    return await this.getById('farmOwner/' + farmOwnerId);
  }

  async getByProductId(productId) {
    return await this.getById('product/' + productId);
  }
}
