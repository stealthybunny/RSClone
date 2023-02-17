import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { IChat, ILogin, IRegister, IToken, IUser } from '../models/types';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { pathToAPI } from '../store';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  errorMessage: any; //-------------------------------------any!!------------------------------
  userData: IUser;
  userAvatar: string | undefined;
  userGallery: string[] | string | undefined;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    ) {
  }

  login(loginInfo: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${pathToAPI}/auth/login`, loginInfo)
    .pipe(
      tap(resp => {
          const logInfo: IToken = resp;
          window.localStorage.setItem('RSClone-socnetwork', JSON.stringify(logInfo));
          window.location.assign('/user/' + resp._id);

      }),
      catchError(this.errorHandler.bind(this))
    ) 
  }

  register(registerInfo: IRegister): Observable<any> {
    return this.http.post<IToken>(`${pathToAPI}/auth/registration`, registerInfo)
      .pipe(
        tap(resp => {
          const logInfo: any = resp;
          window.localStorage.setItem('RSClone-socnetwork', JSON.stringify(logInfo));
          window.location.assign(`/users/${logInfo._id}`);
      }),
      catchError(this.errorHandler.bind(this))
      )
  }

  getYourPage(id: string, token: string): Observable<IUser> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    return this.http.get<IUser>(`${pathToAPI}/users/` + id, {'headers': headers})
  }


  getUsers(token: string): Observable<IUser[]> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get<IUser[]>(`${pathToAPI}/users`, {'headers': headers})
  }

  writeToUser(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.post<any>(`${pathToAPI}/chats/${id}`, '', {'headers': headers})
  }

  subscribeOnUser(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.post<any>(`${pathToAPI}/users/subs/${id}`, '', {'headers': headers})
  }



  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    console.log('Error occuerd!!!')
    return throwError(() => error.message);

  }
}
