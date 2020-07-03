import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService{

  endpoint = 'users';

  constructor(http: HttpClient) {
    super(http);
  }


  async create(user) {
    await this.post(user);

  }

}
