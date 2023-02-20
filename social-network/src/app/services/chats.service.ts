import {
  IChat,
  IMessageBody,
  IToken,
  IUser,
  IAlertMessage,
} from './../models/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  userLofinInfo: IToken;
  url = `http://localhost:5000/chats`;
  urlUsers = `http://localhost:5000/users`;
  token: string;
  constructor(private http: HttpClient) {
    this.userLofinInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    ) as IToken;
    this.token = this.userLofinInfo.token;
  }

  getChats() {
    return this.http.get<IChat[]>(this.url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getOneChat(id: string) {
    return this.http.get<IChat>(`${this.url}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  sendMessage(message: IMessageBody, chatId: string) {
    console.log('отправка сообщения', message, chatId);
    return this.http.post(`${this.url}/message/${chatId}`, message, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getOneUser(id: string) {
    return this.http.get<IUser>(`${this.urlUsers}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getUnReadMassages() {
    return this.http
      .get<IAlertMessage>(`${this.url}/unread`, {
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
