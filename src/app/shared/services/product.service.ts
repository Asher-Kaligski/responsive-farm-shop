import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CrudService {
  endpoint = 'products';

  constructor(http: HttpClient) {
    super(http);
  }

  async update(product, productId) {
    return await this.putById(product, productId);
  }

  async getAll() {
    return await this.get();
  }

  async delete(id) {
    return await this.deleteById(id);
  }

  async getByFarmOwner(farmOwnerId) {
    return await this.getById('farmOwner/' + farmOwnerId);
  }

  async create(product) {
    return await this.post(product);
  }

  async getProduct(productId) {
    return await this.getById(productId);
  }
}
