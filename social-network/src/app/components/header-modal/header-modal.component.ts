import { darkTheme } from './../../../themes';
import { Component, OnInit } from '@angular/core';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { lightTheme } from 'src/themes';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent {
  isLightTheme: boolean;
  constructor(
    public headerModalService: HeaderModalService,
    private themeService: ThemeService
  ) {
    this.isLightTheme = Boolean(localStorage.getItem('theme'));
  }

  deleteToken() {
    window.localStorage.removeItem('RSClone-socnetwork');
  }

  changeTheme() {
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      localStorage.setItem('theme', 'true');
    } else {
      localStorage.setItem('theme', '');
    }
    this.themeService.changeTheme(this.isLightTheme);
  }
}
