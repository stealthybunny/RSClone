import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  constructor(
    public loginService: LoginServiceService
  ) {

  }
  ngOnInit(): void {
    this.loginService
  }

}
