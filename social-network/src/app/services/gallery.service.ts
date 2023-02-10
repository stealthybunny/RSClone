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
  userLofinInfo: IToken;
  url = `http://localhost:5000/users/images`;
  token: string;
  constructor(private http: HttpClient) {
    this.userLofinInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    ) as IToken;
    this.token = this.userLofinInfo.token;
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
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
