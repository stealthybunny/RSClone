import { Component, OnInit } from '@angular/core';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit{
  public users: any;
  constructor(
    public headerModalService: HeaderModalService,
    public loginService: LoginServiceService
  ) {
    
  }
  ngOnInit(): void {
    const token: string = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
    this.users = this.loginService.getUsers(token).subscribe((data) => this.users = data)
    
  }

}
