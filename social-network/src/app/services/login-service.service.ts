import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ILogin } from '../models/types';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  errorMessage: any

  constructor(private http: HttpClient) {

  }

  login(loginInfo: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>('http://localhost:5000/auth/login', loginInfo)
      .pipe(
        catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.errorMessage = error.message;
          console.error('Erorr!', error)
          return of();
        })
      )  
  }
}
