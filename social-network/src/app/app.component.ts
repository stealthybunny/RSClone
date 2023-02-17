import { Component } from '@angular/core';
import { EditProfileService } from './services/edit-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'social-network';

  constructor(
    public editProfileService: EditProfileService
  ) {

  }

  isLogin() {
    let url = new URL(window.location.href);
    return url.pathname === '/auth/login' || url.pathname === '/auth/registration';
  }
}
