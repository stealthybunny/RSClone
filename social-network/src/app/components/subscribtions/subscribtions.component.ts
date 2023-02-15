import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-subscribtions',
  templateUrl: './subscribtions.component.html',
  styleUrls: ['./subscribtions.component.scss']
})
export class SubscribtionsComponent implements OnInit{
  token: string;
  @Input() subscriptions: IUser[];
  api: string;
  subsTotal: number;
  

  constructor(private loginService: LoginServiceService) {

  }
  ngOnInit(): void {
    console.log(this.subscriptions)
    this.api = pathToAPI;
  }

}
