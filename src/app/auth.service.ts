import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthToken} from "./auth-token";
import {AuthResponse} from "./auth-response";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'https://labjwt.zecer.wi.zut.edu.pl';

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
  ) { }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public isAdmin(): boolean {
    const token = this.jwtHelper.decodeToken() as AuthToken;
    if (!this.isAuthenticated()) {
      return false;
    }

    return token && token.roles && token.roles.includes('ADMIN');
  }

  public login(username: String, password: String): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(`${this.baseURL}/api/auth/login`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          console.debug('login() response', response);
          if (response.token) {
            localStorage.setItem('access_token', response.token);
          }
          else {
            localStorage.removeItem('access_token');
          }
        })
      )
      ;
  }

  public getUsername(): string|null {
    const token = this.jwtHelper.decodeToken() as AuthToken;

    return token?.sub;
  }

  public logout() {
    localStorage.removeItem('access_token');
  }
}
