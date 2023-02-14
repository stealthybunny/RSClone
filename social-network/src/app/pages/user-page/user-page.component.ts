import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';
import { IImage, IUser } from 'src/app/models/types';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  user: IUser;
  userSubscription: Subscription;
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
    public avatarChangeMenuService: AvatarChangeMenuService
  ) {}
  ngOnInit(): void {
    console.log('---------userPage OnInit!!----')
    if (JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string)) {
      
    }
    const authInfo = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string);
    this.token = authInfo.token;
    this.userSubscription = this.route.data.subscribe((data) => {
      this.user = data['data'];
      if (this.user._id === authInfo._id) {
        this.isYourPage = true;
      }
      this.userAvatar = `${pathToAPI}/${this.user.avatar.imgLink}`;
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

  avatarRedraw() {
    
  }
}
