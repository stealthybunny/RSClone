import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { ILogin, IToken } from 'src/app/models/types';
import { ErrorService } from 'src/app/services/error.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private loginService: LoginServiceService,
    public errorService: ErrorService
  ) {}

  submit() {
    window.localStorage.removeItem('RSClone-socnetwork');
    const loginInfo: ILogin = {
      username: this.form.value.username as string,
      password: this.form.value.password as string,
    };
    this.loginService.login(loginInfo).subscribe((authData) => {
      this.loginService.getUsers(authData.token).subscribe();
    });
  }

  ngOnInit(): void {}
}
