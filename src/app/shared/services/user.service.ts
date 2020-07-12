import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../../core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService {
  endpoint = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  async create(user) {
    await this.post(user);
  }

  async getAll() {
    return await this.get();
  }

  async updateUser(user, userId) {
    return await this.putById(user, userId);
  }

  async getUserById(userId) {
    return await this.getById(userId);
  }
}
