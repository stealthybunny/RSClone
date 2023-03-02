import { IPost } from './../../models/types';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostUploadService } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.scss'],
})
export class PostUploadComponent implements OnInit {
  form: FormGroup;
  @ViewChild('files') files: ElementRef;
  @ViewChild('textbox') textbox: ElementRef;
  @Output() updatePosts = new EventEmitter<IPost[]>();
  errors: { message: string[] } | null;
  fileError: { message: string } | null;
  isDisabled = false;
  constructor(private postUploadService: PostUploadService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      headline: new FormControl(''),
      text: new FormControl(''),
      files: new FormControl(''),
    });
  }

  onSubmit() {
    this.isDisabled = true;
    this.form.get('text')?.setValue(this.textbox.nativeElement.innerText);
    const formData = new FormData();
    formData.append('files', this.form.get('files')?.value);
    formData.append('headline', this.form.get('headline')?.value);
    formData.append('text', this.form.get('text')?.value);
    this.postUploadService.postUpload(formData).subscribe({
      next: (data) => {
        this.form.reset();
        this.textbox.nativeElement.innerText = '';
        this.files.nativeElement.value = null;
        this.errors = null;
        this.isDisabled = false;
        this.updatePosts.emit(data);
      },
      error: (e) => {
        console.log(e);
        if (Array.isArray(e.message)) {
          this.errors = e;
        } else {
          this.fileError = e;
        }
        this.isDisabled = false;
      },
    });
  }

  onFileChange(event: any) {
    let addFile = document.querySelector('.add__file');
    addFile!.innerHTML = 'Фото выбрано (1)';
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('files')?.setValue(file);
    }
  }
}
