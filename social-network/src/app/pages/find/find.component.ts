import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit {
  public users: IUser[];
  public currentSubs: string[] = [];
  public token: string;
  public api = environment.apiUrl;
  public isOnline: boolean = false;
  constructor(
    private router: Router,
    public headerModalService: HeaderModalService,
    private loginService: LoginServiceService
  ) {}
  ngOnInit(): void {
    const authInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    );
    this.token = authInfo.token;
    const token: string = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    ).token;

    this.loginService
      .getYourPage(authInfo._id, this.token)
      .subscribe((yourData) => {
        this.currentSubs = yourData.subscriptions.map((el: IUser) => {
          return el._id;
        });
      });

    this.loginService.getUsers(token).subscribe((data) => {
      const dataArr = data.filter((user) => user._id !== authInfo._id);
      this.users = dataArr;
    });
  }

  write(userID: string, token: string) {
    this.loginService.writeToUser(userID, token).subscribe((data) => {
      const chatID = data.chat;
      this.router.navigate(['chats', chatID]);
    });
  }

  subscribe(user: IUser, token: string) {
    this.loginService.subscribeOnUser(user._id, token).subscribe((data) => {
      console.log(`You have subscribed on ${user.name}!`);
    });
  }

  unsubscribe(user: IUser, token: string) {
    this.loginService.unsubscribeFromUser(user._id, token).subscribe((data) => {
      console.log(`You have unsubscribed from ${user.name}!`);
    });
  }

  checkSub(user: IUser) {
    const element = user._id;
    const arr = this.currentSubs;
    return arr.includes(element);
  }
}
