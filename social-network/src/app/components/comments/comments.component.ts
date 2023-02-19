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
import { pathToAPI } from 'src/app/store';

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
  api = pathToAPI;
  @ViewChild('textbox') textbox: ElementRef;
  constructor(private newsServes: NewsService) {}

  ngOnInit(): void {
    console.log(this.comments);
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
            console.log(data);
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
            console.log(data);
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
