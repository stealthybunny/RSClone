import { environment } from './../../../environments/environment';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IImage, ILogin, IToken, IUser } from 'src/app/models/types';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';
import { SubscribersModalComponent } from 'src/app/components/subscribers-modal/subscribers-modal.component';
import { SubscribersModalService } from 'src/app/services/subscribers-modal.service';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnChanges {
  user: IUser;
  userSubscription: Subscription;
  onlineUsers: IUser[];
  offlineUsers: IUser[];
  sortedSubs: IUser[];
  yourSubscribtions: string[];
  userSubscribers: IUser[];
  isSubscribed: boolean;
  subBtnContent: string = '⭯';
  authInfo: IToken;
  isDisabled: boolean = false;

  userAvatar: string;
  token: string;
  isYourPage: boolean = false;
  avatar: IImage;
  api = environment.apiUrl;

  faEllipsis = faEllipsis;
  bgModal = false;

  constructor(
    private route: ActivatedRoute,
    public headerModalService: HeaderModalService,
    public subscribersModalService: SubscribersModalService,
    public loginService: LoginServiceService,
    public editProfileService: EditProfileService,
    public avatarChangeMenuService: AvatarChangeMenuService,
    public subModalService: SubsModalServiceService
  ) {}

  ngOnChanges(): void {
    this.getYourSubscribtions();
  }

  ngOnInit(): void {
    if (
      JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string)
    ) {
    }
    this.authInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    );
    this.token = this.authInfo.token;
    this.userSubscription = this.route.data.subscribe((data) => {
      this.user = data['data'];
      this.offlineUsers = this.user.subscriptions.filter(
        (el: { isOnline: any }) => !el.isOnline
      );
      this.onlineUsers = this.user.subscriptions.filter(
        (el: { isOnline: any }) => el.isOnline
      );
      this.sortedSubs = [...this.onlineUsers, ...this.offlineUsers];
      if (this.user._id === this.authInfo._id) {
        this.isYourPage = true;
      } else {
        this.isYourPage = false;
      }
      this.userAvatar = `${environment.apiUrl}/${this.user.avatar.imgLink}`;
    });
    this.getYourSubscribtions();
  }

  getYourSubscribtions() {
    this.loginService
      .getYourPage(this.authInfo._id, this.authInfo.token)
      .subscribe({
        next: (data) => {
          this.userSubscribers = data.subscribers;
          this.yourSubscribtions = data.subscriptions.map(
            (el: IUser) => el._id
          );
          this.checkYourSubscribtions();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  checkYourSubscribtions() {
    console.log('-!------checking your subscribtions----!-');
    if (this.yourSubscribtions.includes(this.user._id)) {
      this.isSubscribed = true;
      this.subBtnContent = 'Отписаться';
    } else {
      this.isSubscribed = false;
      this.subBtnContent = 'Подписаться';
    }
  }

  subAction() {
    this.subBtnContent = '⭯';
    this.isDisabled = true;
    if (this.isSubscribed) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }

  subscribe() {
    this.loginService
      .subscribeOnUser(this.user._id, this.authInfo.token)
      .subscribe({
        next: (data) => {
          this.isDisabled = false;
          this.user = data;
          this.ngOnChanges();
        },
        error: (e) => {
          console.log(e);
          this.isDisabled = false;
          this.ngOnChanges();
        },
      });
  }

  unsubscribe() {
    this.loginService
      .unsubscribeFromUser(this.user._id, this.authInfo.token)
      .subscribe({
        next: (data) => {
          this.user = data;
          this.isDisabled = false;
          this.ngOnChanges();
        },
        error: (e) => {
          console.log(e);
          this.isDisabled = false;
          this.ngOnChanges();
        },
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
