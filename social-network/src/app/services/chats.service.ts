import { IChat, IMessageBody } from './../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  url = `http://localhost:5000/chats`;
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNjNlMjEzNmFkY2RmNmRhODYwNzQyOTI5IiwiaWF0IjoxNjc1ODQ4ODc5LCJleHAiOjE2NzU5MzUyNzl9.u7WCfz8_klNPJrKXgyW06GankfTEpY51GoCs1XUiJlc';
  constructor(private http: HttpClient) {}

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
