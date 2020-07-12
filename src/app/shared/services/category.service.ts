import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../../core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudService {
  endpoint = 'categories';

  constructor(http: HttpClient) {
    super(http);
  }

  async getAll() {
    return await this.get();
  }
}
