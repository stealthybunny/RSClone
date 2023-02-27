import { ThemeService } from './services/theme.service';
import { Component, OnInit } from '@angular/core';
import { IToken } from './models/types';
import { EditProfileService } from './services/edit-profile.service';
import {
  ActivationEnd,
  ActivationStart,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

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
  isActive = false;
  constructor(
    public editProfileService: EditProfileService,
    private themeService: ThemeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    alert('Подождите до 01.03 пожалуйста и получите плюс в карму')
    if (!this.userLofinInfo) {
      this.userLofinInfo = { _id: 'id', token: 'token' };
      window.localStorage.setItem(
        'RSClone-socnetwork',
        JSON.stringify(this.userLofinInfo)
      );
    }
    this.themeService.changeTheme();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.isActive = true;
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isActive = false;
        }, 1000);
      }
    });
  }

  isLogin() {
    let url = new URL(window.location.href);
    return (
      url.pathname === '/auth/login' || url.pathname === '/auth/registration'
    );
  }

  runPreloader() {
    this.isActive = true;
    setTimeout(() => {
      this.isActive = false;
    }, 1580);
  }
}
