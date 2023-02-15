import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderComponent } from '../components/header/header.component';
import { IImage } from '../models/types';
import { pathToAPI } from '../store';

@Injectable({
  providedIn: 'root'
})
export class DataTransportService {
  photoData: IImage;
  sub = new Subject()


  constructor(
    // private headerComponent: HeaderComponent
  ) { }

  getPhoto(data: IImage) {
    // this.photoData = data;
    this.sub.next(data);
    // this.changeAvatar.emit(data)
    // this.headerComponent.userAvatar = `${pathToAPI}/${data.imgLink}`

    console.log('Photo has been changed!!!!!!!!!!!!');
    

  }

  setPhoto() {
    // this.headerComponent.userAvatar = `${pathToAPI}/${this.photoData.imgLink}`
  }
}
