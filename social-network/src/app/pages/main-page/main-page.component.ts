import { Component, OnInit } from '@angular/core';
import { IToken, IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { AuthState } from 'src/app/store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  public userData: IUser;
  public userAvatar: string | undefined;
  public userName: string | undefined;
  constructor(
    public loginService: LoginServiceService,
    public headerModalService: HeaderModalService
  ) {

  }
  ngOnInit(): void {
    console.log(AuthState)
    this.loginService.getPageData();
  }



}
