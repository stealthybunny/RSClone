import { environment } from './../../../../environments/environment';
import { IImage } from './../../../models/types';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
})
export class GalleryModalComponent implements OnInit {
  @Input() image: IImage;
  @Output() newItemEvent = new EventEmitter<boolean>();
  @Input() imgArrFromParrent: IImage[];
  imgList: IImage[];
  @Output() sendData = new EventEmitter<IImage[]>();
  index: number;
  likesVisable = false;
  api = environment.apiUrl;
  isDisabled = false;
  constructor(private galleryService: GalleryService) {}
  ngOnInit(): void {
    this.imgList = this.imgArrFromParrent;
    this.index = this.getIndex();
    this.galleryService.getImagesList(this.image.author._id).subscribe({
      next: (data) => {
        this.imgList = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  close() {
    this.imgArrFromParrent = [...this.imgList];
    console.log('event');
    this.newItemEvent.emit(false);
    this.sendData.emit(this.imgList);
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

  postLike(id: string) {
    this.galleryService.postLike(id).subscribe({
      next: (data) => {
        console.log(data);
        this.imgList[this.index] = data;
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false;
      },
    });
  }
}
