import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private http: Http) { }
  auth = false;
  signin(user: Object) {
    return this.http.post('http://localhost:3000/api/auth/login', user)
  }

  isAuth() {
    this.http.get('http://localhost:3000/api/auth/is-auth').subscribe(
      (response) => {
        this.auth = true;
        console.log('true')
      },
      (error) => {
        this.auth = false;
        console.log('false')
      }
    )
  }

  checkAuth() {
    return this.auth;
  }
}
