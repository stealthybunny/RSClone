import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';
import { IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  user: IUser;
  userSubscription: Subscription;
  userAvatar: string;
  token: string;


  constructor(
    private route: ActivatedRoute,
    public headerModalService: HeaderModalService,
    public loginService: LoginServiceService

  ) {

  }
  ngOnInit(): void {
    this.token = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;    
    this.userSubscription = this.route.data.subscribe((data) => {
    this.user = data['data'];
    this.userAvatar = `${pathToAPI}/${this.user.avatar.imgLink}`;
    console.log(this.userAvatar)})
  }

  writeToThisUser() {
    this.loginService.writeToUser(this.user._id, this.token).subscribe((data) => {
      const chatID = data.chat;
      window.location.assign(`/chats/${chatID}`);
    })
  }

}
