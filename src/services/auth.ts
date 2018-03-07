import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  auth = false;
  signin(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/login', user)
  }

  isAuth() {
    this.http.get('http://localhost:3000/api/auth/is-auth', {withCredentials: true}).subscribe(
      (response) => {
        this.auth = true;
      },
      (error) => {
        this.auth = false;
      }
    )
  }

  checkAuth() {
    return this.auth;
  }
}
