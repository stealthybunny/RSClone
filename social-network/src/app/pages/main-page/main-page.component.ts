import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  public userData: any;
  constructor(
    private loginService: LoginServiceService
  ) {

  }
  ngOnInit(): void {
    if (window.localStorage.getItem('RSClone-socnetwork')) {
      const userLofinInfo: IToken = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string);
      this.loginService.getYourPage(userLofinInfo._id, userLofinInfo.token).subscribe(userdata => this.userData = userdata)
    } else {
      window.location.assign('/auth/login')
    }
    
  }

}
