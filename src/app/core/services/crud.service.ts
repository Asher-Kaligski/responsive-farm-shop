import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

export abstract class CrudService<T = any> {
  protected endpoint;
  url = 'https://farm-shop.herokuapp.com/api';

  protected constructor(protected http: HttpClient) {}

  public async get(): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .get(`${this.url}/${this.endpoint}`)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('GET', error);
    }
    return response;
  }

  public async getById(id: number | string): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .get(`${this.url}/${this.endpoint}/${id}`)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('GET', error);
    }
    return response;
  }

  public async patchById(body, id: number | string): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .patch(`${this.url}/${this.endpoint}/${id}`, body)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('GET', error);
    }
    return response;
  }

  public async putById(body, id: number | string): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .put(`${this.url}/${this.endpoint}/${id}`, body)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('GET', error);
    }
    return response;
  }

  public async post(body): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .post(`${this.url}/${this.endpoint}`, body)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('POST', error);
    }
    return response;
  }

  public async patch(body): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .patch(`${this.url}/${this.endpoint}`, body)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('PATCH', error);
    }
    return response;
  }

  public async deleteById(id: number | string): Promise<any> {
    let response = null;
    try {
      response = await this.http
        .delete(`${this.url}/${this.endpoint}/${id}`)
        .toPromise();
    } catch (error) {
      response = this.errorHandler('DELETE', error);
    }
    return response;
  }

  public errorHandler(
    method: string,
    error: HttpErrorResponse
  ): Promise<never> {
    console.error(
      `Error occurred during ${method} ${this.url}/${this.endpoint}`,
      error
    );
    return Promise.reject(error);
  }
}
