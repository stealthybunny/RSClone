import { IImage } from './../models/types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from '../models/types';

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
}
