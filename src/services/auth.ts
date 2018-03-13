import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  token = null;
  signin(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/login-mobile', user)
  }

  isAuth() {
    return this.http.get('http://localhost:3000/api/auth/is-auth')
  }
}
