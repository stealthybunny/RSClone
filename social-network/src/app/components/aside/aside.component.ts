import { Component, OnInit } from '@angular/core';
import { IToken } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  userPath: string;
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;
  constructor(public loginService: LoginServiceService) {}
  ngOnInit(): void {
    this.userPath = `/user/${this.userLofinInfo._id}`;
    this.loginService;
  }
  getGalleryLink() {
    return `/gallery/${this.userLofinInfo._id}`;
  }
}
