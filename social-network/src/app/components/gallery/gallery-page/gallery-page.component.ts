import { IImage } from './../../../models/types';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChatsService } from 'src/app/services/chats.service';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  imgList: IImage[];
  form: FormGroup;
  error: { statusCode: number; message: string } | null;
  @ViewChild('file') file: ElementRef;
  isDisabled: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.imgList = data['data'];
      console.log(this.imgList);
    });
    this.form = this.formBuilder.group({
      files: [''],
    });
  }

  onFileChange(event: any) {
    console.log('change');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('files')!.setValue(file);
      console.log(this.form);
      this.error = null;
    }
  }

  onSubmit() {
    this.isDisabled = true;
    const formData = new FormData();
    formData.append('files', this.form.get('files')!.value);

    this.galleryService.upload(formData).subscribe({
      next: (data) => {
        console.log(data);
        this.imgList = data;
        this.file.nativeElement.value = null;
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.error = e;
        this.isDisabled = false;
      },
    });
  }

  getImageLink(image: IImage) {
    return { link: `http://localhost:5000/${image.imgLink}` };
  }
}
