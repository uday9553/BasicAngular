import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError,timeout} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector, Injector) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request;
        req.headers.set('token-key', 'token-value');
        //you can add more to headers
        return next.handle(req).pipe(
            retry(1), timeout(20000), catchError(this.handleError));
    }

    handleError(error) {
        if (error.error instanceof HttpErrorResponse) {
            console.log('HttpErrorResponse');
            if (error.error instanceof ErrorEvent) {
                console.log('client side error or network error' + error.error.message);
            }else{
                if (error.status == 401) {
                    console.log('not authorized' + error.status);
                }
                if (error.status == 403) {
                    console.log('Access denied' + error.status);
                }
            }
        }
        return throwError('error occured');
    }
}