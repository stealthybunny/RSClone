import { pathToAPI } from './../../../store';
import { IImage } from './../../../models/types';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
})
export class GalleryModalComponent implements OnInit {
  @Input() image: IImage;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() imgList: IImage[];
  index: number;
  likesVisable = false;
  api = pathToAPI;
  constructor() {}
  ngOnInit(): void {
    this.index = this.getIndex();
  }

  test() {
    console.log('event');
    this.newItemEvent.emit(false);
  }

  getIndex() {
    console.log(this.imgList.indexOf(this.image));
    return this.imgList.indexOf(this.image);
  }

  increment() {
    if (this.index == this.imgList.length - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }
  }

  decrement() {
    if (!this.index) {
      this.index = this.imgList.length - 1;
    } else {
      this.index -= 1;
    }
  }
}
