import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../../core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class FarmService extends CrudService {
  endpoint = 'farms';

  constructor(http: HttpClient) {
    super(http);
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
}

