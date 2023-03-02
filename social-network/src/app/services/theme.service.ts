import { getLocaleMonthNames } from '@angular/common';
import { Injectable } from '@angular/core';
import { darkTheme, lightTheme } from 'src/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isLightTheme = false;
  constructor() {
    this.setLightTheme();
  }

  changeTheme(togle: boolean = this.isLightTheme) {
    const root = document.querySelector(':root')! as HTMLElement;
    togle
      ? (root.style.cssText = lightTheme)
      : (root.style.cssText = darkTheme);
  }

  setLightTheme() {
    localStorage.getItem('theme')
      ? (this.isLightTheme = true)
      : localStorage.setItem('theme', '');
  }
}
