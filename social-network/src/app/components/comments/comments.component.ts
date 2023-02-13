import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/types';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: IComment[]

  constructor(

  ) {

  }

  ngOnInit(): void {
    console.log(this.comments)
    this.comments
  }

}
