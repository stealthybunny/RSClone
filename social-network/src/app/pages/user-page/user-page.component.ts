import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';
import { IImage, ILogin, IToken, IUser } from 'src/app/models/types';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';
import { pathToAPI } from 'src/app/store';

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
  api = pathToAPI;

  constructor(
    private route: ActivatedRoute,
    public headerModalService: HeaderModalService,
    public loginService: LoginServiceService,
    public editProfileService: EditProfileService,
    public avatarChangeMenuService: AvatarChangeMenuService,
    public subModalService: SubsModalServiceService
  ) { }

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
      this.offlineUsers = this.user.subscriptions.filter((el: { isOnline: any; }) => !el.isOnline);
      this.onlineUsers = this.user.subscriptions.filter((el: { isOnline: any; }) => el.isOnline);
      this.sortedSubs = [...this.onlineUsers, ...this.offlineUsers];
      if (this.user._id === this.authInfo._id) {
        this.isYourPage = true;
      } else {
        console.log('not yours')
        this.isYourPage = false;
      }
      this.userAvatar = `${pathToAPI}/${this.user.avatar.imgLink}`;
    });
    this.getYourSubscribtions();
  }



  getYourSubscribtions() {
    this.loginService.getYourPage(this.authInfo._id, this.authInfo.token).subscribe({
      next: (data) => {
        this.userSubscribers = data.subscribers;
        this.yourSubscribtions = data.subscriptions.map((el: IUser) => el._id)
        console.log('yourSUbs', this.yourSubscribtions);
        this.checkYourSubscribtions();
      }, 
      error: (e) => {
        console.log(e)
      }
    })
  }

  checkYourSubscribtions() {
    if (this.yourSubscribtions.includes(this.user._id)) {
      this.isSubscribed = true;
      this.subBtnContent = 'Отписаться'
      
    } else {
      this.isSubscribed = false
      this.subBtnContent = 'Подписаться'

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
    this.loginService.subscribeOnUser(this.user._id, this.authInfo.token).subscribe({
      next: (data) => {
        console.log('-----------------get-----------------------', data.subscribers);
        this.isDisabled = false;
        this.user = data;
        this.ngOnChanges()
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false
        this.ngOnChanges()
      },
    })
    
  }

  unsubscribe() {
    this.loginService.unsubscribeFromUser(this.user._id, this.authInfo.token).subscribe({
      next: (data) => {
        console.log('-------------------delete---------------------',data.subscribers);
        this.user = data;
        this.isDisabled = false;
        this.ngOnChanges()
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false;
        this.ngOnChanges()
      },
  })
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
