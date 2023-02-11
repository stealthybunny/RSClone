import { pathToAPI } from './../../../store';
import { IImage } from './../../../models/types';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
})
export class GalleryModalComponent {
  @Input() image: IImage;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() imgList: IImage[];
  likesVisable = false;
  api = pathToAPI;
  constructor() {}

  test() {
    console.log('event');
    this.newItemEvent.emit(false);
  }
}
