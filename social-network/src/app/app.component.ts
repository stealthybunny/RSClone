import { ThemeService } from './services/theme.service';
import { Component, OnInit } from '@angular/core';
import { IToken } from './models/types';
import { EditProfileService } from './services/edit-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'social-network';
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;

  constructor(
    public editProfileService: EditProfileService,
    private themeService: ThemeService
  ) {}
  ngOnInit(): void {
    if (!this.userLofinInfo) {
      this.userLofinInfo = { _id: 'id', token: 'token' };
      window.localStorage.setItem(
        'RSClone-socnetwork',
        JSON.stringify(this.userLofinInfo)
      );
    }
    this.themeService.changeTheme();
  }

  isLogin() {
    let url = new URL(window.location.href);
    return (
      url.pathname === '/auth/login' || url.pathname === '/auth/registration'
    );
  }
}
