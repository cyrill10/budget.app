import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {StorageService} from './storage.service';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return this.storage.getServicePath$().pipe(mergeMap(host => {
        const newReq = request.clone(
          {
            url: host + request.url,
            headers: environment.getAuthorizationHeaders()
          });
        return next.handle(newReq);
      }))
  }
}
