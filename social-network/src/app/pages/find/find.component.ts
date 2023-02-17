import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit{
  public users: IUser[];
  public currentSubs: IUser[];
  public token: string;
  public api = pathToAPI;
  public isOnline: boolean = false;
  constructor(
    private router: Router,
    public headerModalService: HeaderModalService,
    private loginService: LoginServiceService,
  ) {
    
  }
  ngOnInit(): void {
    const authInfo = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string)
    this.token = authInfo.token;
    const token: string = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
    this.loginService.getUsers(token).subscribe((data) => {
      const dataArr = data.filter(user => user._id !== authInfo._id);
      this.users = dataArr;
      console.log(this.users)
    })
    this.loginService.getYourPage(authInfo._id, this.token).subscribe(yourData => {
      this.currentSubs = yourData.subscriptions;
    })
    
  }

  write(userID: string, token: string) {
    this.loginService.writeToUser(userID, token).subscribe((data) => {
      const chatID = data.chat;
      this.router.navigate(['chats',chatID]);
    })
  }

  subscribe(userID: string, token: string) {
    this.loginService.subscribeOnUser(userID, token).subscribe(data => {
      const name = (data[data.length - 1].name)
      console.log(`You have subscribed on ${name}!`)
    })
  }
}
