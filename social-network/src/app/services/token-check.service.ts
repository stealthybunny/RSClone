import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class TokenCheckService {
  constructor(private http: HttpClient) {}

  getUsers(token: string): Observable<IUser[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`, {
      headers: headers,
    });
  }

  tokenCheck() {}
}
