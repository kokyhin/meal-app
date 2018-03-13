import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../services/auth";
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    const token = auth.token;
    const localToken = localStorage.getItem('token') || 'test';
    request = request.clone({
      setHeaders: {
        Authorization: token ? token : localToken
      }
    });
    return next.handle(request);
  }
};
