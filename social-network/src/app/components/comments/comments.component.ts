import { environment } from './../../../environments/environment';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IComment } from 'src/app/models/types';
import { NewsService } from 'src/app/services/news.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GalleryModalComponent } from '../gallery/gallery-modal/gallery-modal.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: IComment[] = [];
  @Input() postId: string;
  @Input() isPost = true;
  @Output() updateComments = new EventEmitter<IComment[]>();
  isDisabled = false;
  form: FormGroup;
  api = environment.apiUrl;
  @ViewChild('textbox') textbox: ElementRef;
  faPaperPlane = faPaperPlane;
  constructor(
    private newsServes: NewsService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl(''),
    });
  }
  onSubmit() {
    this.form.get('text')?.setValue(this.textbox.nativeElement.innerText);
    if (this.form.value.text) {
      this.isDisabled = true;
      if (this.isPost) {
        this.newsServes.sendComment(this.postId, this.form.value).subscribe({
          next: (data) => {
            //this.comments = data;
            this.updateComments.emit(data);
            this.form.reset();
            this.textbox.nativeElement.innerText = '';
            this.isDisabled = false;
          },
          error: (e) => {
            console.log(e);
            this.isDisabled = false;
          },
        });
      } else {
        this.newsServes.sendImgComment(this.postId, this.form.value).subscribe({
          next: (data) => {
            this.updateComments.emit(data);
            this.form.reset();
            this.textbox.nativeElement.innerText = '';
            this.isDisabled = false;
          },
          error: (e) => {
            console.log(e);
            this.isDisabled = false;
          },
        });
      }
    }
  }
}
