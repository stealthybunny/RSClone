import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GetYourPageService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) { }
}
