import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IImage } from 'src/app/models/types';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
})
export class GalleryImageComponent implements OnInit {
  @Input() image: IImage;
  @Input() id = '';
  @Input() isSameId = false;
  @Input() imgList: IImage[];
  isOpen = false;
  @Output() delete = new EventEmitter<string>();
  isDisabled = false;
  constructor() {}

  ngOnInit(): void {
    console.log('персесборка');
  }

  getImageLink(image: IImage) {
    return {
      link: `background-image: url("http://localhost:5000/${image.imgLink}");`,
    };
  }

  close(status: boolean) {
    this.isOpen = status;
    console.log(this.isOpen);
  }

  test() {
    console.log('test');
  }

  deleteEvent() {
    this.delete.emit(this.image._id);
  }

  getIndex() {
    console.log(this.imgList.indexOf(this.image));
    return this.imgList.indexOf(this.image);
  }
}
