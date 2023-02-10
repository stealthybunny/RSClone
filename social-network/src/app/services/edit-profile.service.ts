import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pathToAPI } from '../store';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) { }

  changeProfilePhoto(token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
    return this.http.post(`${pathToAPI}/users/avatar`, {}, {'headers': headers})




  }
}
