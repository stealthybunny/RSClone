import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/types';
import { pathToAPI } from '../store';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService {

  constructor(
    private http: HttpClient
  ) { 
    
  }
  
  getUsers(token: string): Observable<IUser[]> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get<IUser[]>(`${pathToAPI}/users`, {'headers': headers})
  }

  tokenCheck() {

  }


}
