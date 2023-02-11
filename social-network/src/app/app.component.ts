import { Component } from '@angular/core';
import { EditProfileService } from './services/edit-profile.service';
// import { HeaderModalService } from './services/header-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'social-network';

  constructor(
    public editProfileService: EditProfileService
    // public headerModalService: HeaderModalService
  ) {

  }

  isLogin() {
    let url = new URL(window.location.href);
    console.log(url.pathname);
    return url.pathname === '/auth/login' || url.pathname === '/auth/registration';
  }
}
