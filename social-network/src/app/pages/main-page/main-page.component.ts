import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IImage, IToken, IUser } from 'src/app/models/types';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { AuthState, pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  authInfo: IToken = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  );
  public userData: IUser;
  public userAvatar: string | undefined;
  public changedAvatar: IImage;
  public userName: string | undefined;
  userSubscription: Subscription;
  constructor(
    public loginService: LoginServiceService,
    public headerModalService: HeaderModalService,
    public editProfileService: EditProfileService,
    public avatarChangeMenuService: AvatarChangeMenuService
  ) {}
  ngOnInit(): void {
    const authInfo = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    );
    this.userSubscription = this.loginService
      .getYourPage(authInfo._id, authInfo.token)
      .subscribe((userdata) => {
        this.userName = userdata.name;
        this.userAvatar = `${pathToAPI}/${userdata.avatar.imgLink}`;
        this.changedAvatar = userdata.avatar;
      });
  }
}
