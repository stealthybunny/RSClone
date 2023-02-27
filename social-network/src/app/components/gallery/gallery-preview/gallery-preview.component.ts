import { environment } from './../../../../environments/environment';
import { IImage } from 'src/app/models/types';

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-preview',
  templateUrl: './gallery-preview.component.html',
  styleUrls: ['./gallery-preview.component.scss'],
})
export class GalleryPreviewComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() id: string;
  oldID: string;
  imgList: IImage[] = [];
  currentImage: IImage;
  modalOpen = false;
  apiUrl = environment.apiUrl;
  @ViewChild('imglist') imglist: ElementRef;
  constructor(private galleryService: GalleryService) {}

  ngAfterViewInit(): void {
    this.setGridTamlate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getImageList(this.id);
  }

  ngOnInit(): void {
    this.getImageList(this.id);
  }

  getImageList(id: string) {
    this.galleryService.getImagesList(id).subscribe({
      next: (data) => {
        this.imgList = data;
        this.setGridTamlate();
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.oldID = this.id;
  }

  getImageLink(image: IImage) {
    return {
      link: `background-image: url("${this.apiUrl}/${image.imgLink}");`,
    };
  }

  setGridTamlate() {
    if (this.imgList.length < 4) {
      let width = 40;
      let grid = 'grid-template-columns:';
      for (let i = 0; i < this.imgList.length; i++) {
        grid += ' 1fr';
        width += 20;
      }
      this.imglist.nativeElement.style.cssText = `${grid};width: ${width}%;`;
    } else {
      this.imglist.nativeElement.style.cssText = `grid-template-columns: 1fr 1fr 1fr 1fr;  width: 100%;`;
    }
  }
}
