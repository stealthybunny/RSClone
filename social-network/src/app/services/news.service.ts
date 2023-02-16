import { IComment } from './../models/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IPost, IToken } from '../models/types';
import { pathToAPI } from '../store';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  userLofinInfo: IToken;
  url = `${pathToAPI}/posts`;
  token: string;
  constructor(private http: HttpClient) {
    this.userLofinInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    ) as IToken;
    this.token = this.userLofinInfo.token;
  }

  getAllNewsList() {
    return this.http
      .get<IPost[]>(`${this.url}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  postLike(id: string) {
    const url = pathToAPI + '/likes/post/' + id;
    console.log(this.token);
    return this.http
      .post<IPost>(
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

  sendComment(id: string, body: { text: string }) {
    const url = pathToAPI + '/posts/comment/' + id;
    console.log(this.token);
    return this.http
      .post<IComment[]>(url, body, {
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
