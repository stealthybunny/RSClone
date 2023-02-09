import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { ILogin, IRegister, IToken, IUser } from '../models/types';
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
    console.log(`${pathToAPI}/auth/login`)
    return this.http.post<IToken>(`${pathToAPI}/auth/login`, loginInfo)
    .pipe(
      tap(resp => {
          const logInfo: IToken = resp;
          window.localStorage.setItem('RSClone-socnetwork', JSON.stringify(logInfo));
          window.location.assign('');
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
          window.location.assign('');
      }),
      catchError(this.errorHandler.bind(this))
      )
  }

  getYourPage(id: string, token: string): Observable<IUser> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    console.log(headers)
    return this.http.get<IUser>(`${pathToAPI}/users/` + id, {'headers': headers})
      .pipe(
        tap(user => console.log(user))
      )
  }


  getUsers(token: string): Observable<IUser[]> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get<IUser[]>(`${pathToAPI}/users`, {'headers': headers})
  }

  getPageData() {
    let userID: string;
    if (window.localStorage.getItem('RSClone-socnetwork')) {
      const userLofinInfo: IToken = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string);
      if (window.location.pathname === '/') {
        userID = userLofinInfo._id
      } else {
        userID = window.location.pathname //?
      }

        this.getYourPage(userLofinInfo._id, userLofinInfo.token).subscribe(userdata => {
        this.userData = userdata;
        if (this.userData.avatar) {  //useless??-------------
          this.userAvatar = `${pathToAPI}/${this.userData.avatar.imgLink}`;
          console.log(this.userAvatar)
        } else {
          this.userAvatar = `https://www.oseyo.co.uk/wp-content/uploads/2020/05/empty-profile-picture-png-2-2.png`;
        }
        this.userGallery = userdata.gallery;
        if (!this.userGallery?.length) {
          this.userGallery = 'Добавте фото в свою галлерею'
        }
      })
    } else {
      window.location.assign('/auth/login');
    }

  }



  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    console.log('Error occuerd!!!')
    return throwError(() => error.message);

  }
}
