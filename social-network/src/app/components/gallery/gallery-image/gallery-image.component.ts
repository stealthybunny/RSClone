import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImage } from 'src/app/models/types';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
})
export class GalleryImageComponent {
  @Input() image: IImage;
  @Input() id = '';
  @Input() isSameId = false;
  @Input() imgList: IImage[];
  isOpen = false;
  @Output() delete = new EventEmitter<string>();
  isDisabled = false;
  constructor() {}

  getImageLink(image: IImage) {
    return {
      link: `background-image: url("http://localhost:5000/${image.imgLink}");`,
    };
  }

  log(status: boolean) {
    this.isOpen = status;
    console.log(this.isOpen);
  }

  deleteEvent() {
    this.delete.emit(this.image._id);
  }
}
