import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  getDefaultValue() {
    return this.http.get('http://localhost:3000/five-default-value');
  }
  getSearchValue() {
    return this.http.get('http://localhost:3000/another-api-for-search');
  }
}
