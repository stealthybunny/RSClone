import { environment } from './../../environments/environment';
import { IImage } from './../models/types';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from '../models/types';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  apiUrl = environment.apiUrl;
  userLofinInfo: IToken;
  url: string;
  token: string;
  constructor(private http: HttpClient) {
    this.userLofinInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    ) as IToken;
    this.token = this.userLofinInfo.token;
    this.url = `${this.apiUrl}/users/images`;
  }

  getImagesList(userId: string) {
    return this.http.get<IImage[]>(`${this.url}/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  upload(data: any): Observable<IImage[]> {
    let uploadURL = this.url;

    return this.http
      .post<any>(uploadURL, data, {
        // reportProgress: true,
        // observe: 'events',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  postLike(id: string) {
    const url = environment.apiUrl + '/likes/image/' + id;
    return this.http
      .post<IImage>(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<IImage[]> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<IImage[]>(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  changeUserBg(body: { link: string }) {
    const api = `${this.apiUrl}/users/theme`;
    return this.http
      .put<{ link: string }>(api, body, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.statusText === 'Unauthorized') {
      console.log(
        'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj'
      );
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
