import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemsList} from "./items-list";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL = 'https://labjwt.zecer.wi.zut.edu.pl';

  constructor(
    private http: HttpClient,
  ) { }

  public items() {
    return this.http.get<ItemsList>(`${this.baseURL}/api/items`);
  }

  public users() {
    return this.http.get<User[]>(`${this.baseURL}/api/users`);
  }
}
