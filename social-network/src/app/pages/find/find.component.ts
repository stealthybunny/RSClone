import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit{
  public users: IUser[];
  public token: string;
  constructor(
    private router: Router,
    public headerModalService: HeaderModalService,
    private loginService: LoginServiceService,
  ) {
    
  }
  ngOnInit(): void {
    this.token = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
    const token: string = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
    this.loginService.getUsers(token).subscribe((data) => {this.users = data; console.log(this.users)})
  }

  write(userID: string, token: string) {
    this.loginService.writeToUser(userID, token).subscribe((data) => {
      const chatID = data.chat;
      this.router.navigate(['chats',chatID])
    })
  }
}
