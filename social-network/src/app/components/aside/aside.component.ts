import { environment } from './../../../environments/environment';
import { IAlertMessage } from './../../models/types';
import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/models/types';
import { ChatsService } from 'src/app/services/chats.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SseService } from 'src/app/services/sse.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  burgerAvtive: boolean = false;
  userPath: string;
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;
  unread: IAlertMessage | null = null;
  audio = new Audio();
  api = environment.apiUrl;
  constructor(
    public loginService: LoginServiceService,
    private chatsService: ChatsService,
    private sseService: SseService
  ) {}

  ngOnInit(): void {
    this.userPath = `/user/${this.userLofinInfo._id}`;
    this.loginService;
    this.audio.src = '../../../assets/tile3.mp3';
    this.sseService
      .getServerSentEvent(`${this.api}/chats/sse/${this.userLofinInfo._id}`)
      .subscribe({
        next: (data) => {
          this.unread = JSON.parse(data.data);
          if (this.unread?.sound) {
            this.audio.play();
          }
          //console.log(JSON.parse(data.data));
        },
        error: (e) => {
          console.log(e);
        },
      });

    this.chatsService.getUnReadMassages().subscribe({
      next: (data) => {
        this.unread = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  windowCheck() {
    if (window.innerWidth < 1050) {
      
    }
  }

  getGalleryLink() {
    return `/gallery/${this.userLofinInfo._id}`;
  }
}
