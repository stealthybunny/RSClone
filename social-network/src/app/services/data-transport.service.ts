import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IImage } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class DataTransportService {
  photoData: IImage;
  sub = new Subject()


  constructor(
  ) { }

  getPhoto(data: IImage) {
    this.sub.next(data);
  }

}
