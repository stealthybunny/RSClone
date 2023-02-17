import { IImage } from 'src/app/models/types';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss'],
})
export class GalleryPreviewComponent implements OnInit, DoCheck {
  @Input() id: string;
  oldID: string;
  imgList: IImage[] = [];
  currentImage: IImage;
  modalOpen = false;
  constructor(private galleryService: GalleryService) {}

  ngDoCheck(): void {
    if (this.oldID !== this.id) {
      this.galleryService.getImagesList(this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.imgList = data;
        },
        error: (e) => {
          console.log(e);
        },
      });
      this.oldID = this.id
    }
  }

  ngOnInit(): void {
    this.galleryService.getImagesList(this.id).subscribe({
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
