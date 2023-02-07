import { IChat } from './../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  url = `http://localhost:5000/chats`;
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNjNlMjEzNmFkY2RmNmRhODYwNzQyOTI5IiwiaWF0IjoxNjc1NzY2ODE5LCJleHAiOjE2NzU4NTMyMTl9.n1oBRJUv9nsL9x7tplWVWit1zDjxuNdG0xxofZrTrGM';
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
}
