import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/types';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: IPost[];
  constructor(
    private newsServes: NewsService,
  ) {

  }

  ngOnInit(): void {
    this.newsServes.getAllNewsList().subscribe({
      next: (data) => {
        console.log(data);
        this.newsList = data; 
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}

