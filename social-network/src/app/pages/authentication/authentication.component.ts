import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  token = ''
  public checkLocalStorage() {
    if (window.localStorage.getItem('socialNetwork-auth')) {
      this.token = 'you have a '
    }
    else {
      this.token = 'you don\'t have a '
    }
    console.log(this.token)
    return this.token
    
  }
}
