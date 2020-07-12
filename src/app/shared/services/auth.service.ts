import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageKey } from 'shared/models/storage.model';
import { StorageService } from 'shared/services/storage.service';

import { CrudService } from '../../core/services/crud.service';

const { AUTH_TOKEN } = StorageKey;
@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudService {
  endpoint = 'auth';
  token: string;

  constructor(
    http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {
    super(http);
    this.token = this.storage.read(AUTH_TOKEN) || '';
  }

  public async login(form) {
    try {
      const result = await this.post(form);
      this.token = result.token;
      this.storage.save(AUTH_TOKEN, this.token);
      return this.token;
    } catch (error) {
      console.error('Error during login request', error);
      return Promise.reject(error);
    }
  }

  get currentUser() {
    if (!this.token) {
      return null;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    return decodedToken;
  }

  public getToken(): string {
    return this.token;
  }

  public logout() {
    this.token = '';
    this.storage.remove(AUTH_TOKEN);
    this.router.navigate(['/login']);
  }

  public isLogged(): boolean {
    return this.token.length > 0;
  }
}
