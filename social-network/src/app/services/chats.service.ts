import { IChat, IMessageBody, IToken } from './../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  userLofinInfo: IToken;
  url = `http://localhost:5000/chats`;
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

  test(message: IMessageBody, chatId: string) {
    fetch(`${this.url}/message/${chatId}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //make sure to serialize your JSON body
      body: JSON.stringify(message),
    });
  }
}
