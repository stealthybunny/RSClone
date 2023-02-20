import { environment } from './../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';
import { IImage, IUser } from 'src/app/models/types';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  user: IUser;
  userSubscription: Subscription;
  onlineUsers: IUser[];
  offlineUsers: IUser[];
  sortedSubs: IUser[];

  userAvatar: string;
  token: string;
  isYourPage: boolean = false;
  avatar: IImage;
  api = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    public headerModalService: HeaderModalService,
    public loginService: LoginServiceService,
    public editProfileService: EditProfileService,
    public avatarChangeMenuService: AvatarChangeMenuService,
    public subModalService: SubsModalServiceService
  ) {}
  ngOnInit(): void {
    console.log('---------userPage OnInit!!----');
    if (
      JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string)
    ) {
    }
    const authInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    );
    this.token = authInfo.token;
    this.userSubscription = this.route.data.subscribe((data) => {
      this.user = data['data'];
      this.offlineUsers = this.user.subscriptions.filter(
        (el: { isOnline: any }) => !el.isOnline
      );
      this.onlineUsers = this.user.subscriptions.filter(
        (el: { isOnline: any }) => el.isOnline
      );
      this.sortedSubs = [...this.onlineUsers, ...this.offlineUsers];
      console.log(this.sortedSubs);
      console.log('yourPage', this.user);
      // console.log(this.user.gallery)
      if (this.user._id === authInfo._id) {
        console.log('this is your page');
        this.isYourPage = true;
      } else {
        console.log('not yours');
        this.isYourPage = false;
      }
      this.userAvatar = `${environment.apiUrl}/${this.user.avatar.imgLink}`;
      console.log(this.userAvatar);
    });
  }

  writeToThisUser() {
    this.loginService
      .writeToUser(this.user._id, this.token)
      .subscribe((data) => {
        const chatID = data.chat;
        window.location.assign(`/chats/${chatID}`);
      });
  }
}
