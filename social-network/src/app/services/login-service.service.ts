import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { IChat, ILogin, IRegister, IToken, IUser } from '../models/types';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  errorMessage: any; //-------------------------------------any!!------------------------------
  userData: IUser;
  userAvatar: string | undefined;
  userGallery: string[] | string | undefined;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  login(loginInfo: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${this.apiUrl}/auth/login`, loginInfo).pipe(
      tap((resp) => {
        const logInfo: IToken = resp;
        window.localStorage.setItem(
          'RSClone-socnetwork',
          JSON.stringify(logInfo)
        );
        window.location.assign('/user/' + resp._id);
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  register(registerInfo: IRegister): Observable<any> {
    return this.http
      .post<IToken>(`${this.apiUrl}/auth/registration`, registerInfo)
      .pipe(
        tap((resp) => {
          const logInfo: any = resp;
          window.localStorage.setItem(
            'RSClone-socnetwork',
            JSON.stringify(logInfo)
          );
          window.location.assign(`/users/${logInfo._id}`);
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  getYourPage(id: string, token: string): Observable<IUser> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(`${this.apiUrl}/users/` + id, {
      headers: headers,
    });
  }

  getUsers(token: string): Observable<IUser[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<IUser[]>(`${this.apiUrl}/users`, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  writeToUser(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/chats/${id}`, '', {
      headers: headers,
    });
  }

  subscribeOnUser(id: string, token: string): Observable<IUser> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<IUser>(`${this.apiUrl}/users/subs/${id}`, '', {
      headers: headers,
    });
  }

  unsubscribeFromUser(id: string, token: string): Observable<IUser> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<IUser>(`${this.apiUrl}/users/subs/${id}`, {
      headers: headers,
    });
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    console.log('Error occuerd!!!');
    return throwError(() => error.message);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.statusText === 'Unauthorized') {
      window.location.href = '/auth/login';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
