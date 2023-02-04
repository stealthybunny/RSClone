import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { ILogin, IToken } from '../models/types';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  errorMessage: any;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    ) {
  }

  login(loginInfo: ILogin): Observable<IToken> {
    console.log('logind_1')
    return this.http.post<IToken>('http://localhost:5000/auth/login', loginInfo)
    .pipe(
      tap(resp => {
          const logInfo: IToken = resp;
          window.localStorage.setItem('RSClone-socnetwork', JSON.stringify(logInfo));
          window.location.assign('');
      }),
      catchError(this.errorHandler.bind(this))
    )
  }

  getYourPage(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer: ${token}`)
    console.log(headers)
    return this.http.get<any>('http://localhost:5000/users/' + id, {'headers': headers})
      .pipe(
        tap(user => console.log(user))
      )
  }



  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message);

  }
}
