import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/types';
import { NewsService } from 'src/app/services/news.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsList: IPost[];
  isOpen: boolean[];
  isDisabled = false;
  api = pathToAPI;
  constructor(private newsServes: NewsService) {}

  ngOnInit(): void {
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
