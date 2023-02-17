import { IImage } from 'src/app/models/types';

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss'],
})
export class GalleryPreviewComponent implements OnInit, OnChanges {
  @Input() id: string;
  oldID: string;
  imgList: IImage[] = [];
  currentImage: IImage;
  modalOpen = false;
  constructor(private galleryService: GalleryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getImageList(this.id);
  }

  ngOnInit(): void {
    this.getImageList(this.id);
  }

  getImageList(id: string) {
    this.galleryService.getImagesList(id).subscribe({
      next: (data) => {
        console.log(data);
        this.imgList = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.oldID = this.id;
  }

  getImageLink(image: IImage) {
    return {
      link: `background-image: url("http://localhost:5000/${image.imgLink}");`,
    };
  }
}
