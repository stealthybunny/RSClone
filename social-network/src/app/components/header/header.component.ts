import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { HeaderModalComponent } from '../header-modal/header-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userData: any;
  public userAvatar: string | undefined;


  constructor (
    public loginService: LoginServiceService,
    public headerModalService: HeaderModalService
    // public headerModal: HeaderModalComponent
  ) {}

  ngOnInit(): void {
    this.loginService.getPageData()
    // if (window.localStorage.getItem('RSClone-socnetwork')) {
    //   const userLofinInfo: IToken = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string);
    //   this.loginService.getYourPage(userLofinInfo._id, userLofinInfo.token).subscribe(userdata => this.userData = userdata)
    // } else {
    //   window.location.assign('/auth/login')
    // }
  }

}