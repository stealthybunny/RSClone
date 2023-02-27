import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  isVisible$ = new BehaviorSubject<boolean>(false);

  open() {
    this.isVisible$.next(true);
  }

  close() {
    this.isVisible$.next(false);
  }

  log() {
  }

  changeProfilePhoto(token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data');
    return this.http.post(
      `${environment.apiUrl}/users/avatar`,
      {},
      { headers: headers }
    );
  }
}
