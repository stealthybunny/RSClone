import { environment } from './../../../environments/environment';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit, OnChanges {
  public users: IUser[];
  public currentSubs: string[] = [];
  public token: string;
  public api = environment.apiUrl;
  public isOnline: boolean = false;
  public isDisabled: boolean = false;
  // public isDisabledUnsub: boolean = false;
  constructor(
    private router: Router,
    public headerModalService: HeaderModalService,
    private loginService: LoginServiceService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getListOfUsers();
  }

  ngOnInit(): void {
    this.getListOfUsers();
  }

  getListOfUsers() {
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
    console.log('subscribe');
    this.isDisabled = true;
    this.loginService.subscribeOnUser(user._id, token).subscribe({
      next: (data) => {
        this.getListOfUsers();
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false;
      },
    });
  }

  unsubscribe(user: IUser, token: string) {
    console.log('unsubscribe');
    this.isDisabled = true;
    this.loginService.unsubscribeFromUser(user._id, token).subscribe({
      next: (data) => {
        this.getListOfUsers();
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false;
      },
    });
  }

  checkSub(user: IUser) {
    const element = user._id;
    const arr = this.currentSubs;
    return arr.includes(element);
  }
}
