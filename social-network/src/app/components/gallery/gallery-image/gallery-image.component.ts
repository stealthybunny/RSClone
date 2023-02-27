import { environment } from './../../../../environments/environment';
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
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  apiUrl = environment.apiUrl;
  faCoffee = faCoffee;
  faTrash = faTrash;
  constructor() {}

  ngOnInit(): void {
  }

  getImageLink(image: IImage) {
    return {
      link: `background-image: url("${this.apiUrl}/${image.imgLink}");`,
    };
  }

  close(status: boolean) {
    this.isOpen = status;
  }

  test() {
  }

  deleteEvent() {
    this.delete.emit(this.image._id);
  }

  getIndex() {
    return this.imgList.indexOf(this.image);
  }
}
