import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IPost, IToken } from 'src/app/models/types';
import { NewsService } from 'src/app/services/news.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnChanges {
  @Input() id: string = '';
  newsList: IPost[];
  isOpen: boolean[];
  isDisabled = false;
  api = pathToAPI;
  isYourPage: boolean;
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;
  constructor(private newsServes: NewsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isYourPage = this.id === this.userLofinInfo._id;
    this.getUserPostList(this.id);
  }

  ngOnInit(): void {
    this.isYourPage = this.id === this.userLofinInfo._id;
    if (!this.id) {
      this.newsServes.getAllNewsList().subscribe({
        next: (data) => {
          console.log(data);
          this.newsList = data;
          this.isOpen = Array.from(this.newsList, (e) => false);
          console.log(this.isOpen);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this.getUserPostList(this.id);
    }
  }

  getUserPostList(id: string) {
    this.newsServes.getUserPostList(id).subscribe({
      next: (data) => {
        console.log(data);
        this.newsList = data;
        this.isOpen = Array.from(this.newsList, (e) => false);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  sendLike(id: string, index: number) {
    this.newsServes.postLike(id).subscribe({
      next: (data) => {
        console.log(data);
        this.newsList[index] = data;
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false;
      },
    });
  }

  getComments(post: IPost) {
    console.log(post);
    console.log(document.querySelectorAll('app-comments'));
  }
}
