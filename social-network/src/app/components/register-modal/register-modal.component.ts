import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, IRegister, IToken } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    username: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(4)
    ])
  })
  errorMessage: string[] | null = null;

  constructor(private loginService: LoginServiceService) {

  }

  register() {
    window.localStorage.removeItem('RSClone-socnetwork');
    const registerInfo: IRegister = {
      username: this.form.value.username as string,
      name: this.form.value.name as string,
      password: this.form.value.password as string,
    }
    this.loginService.register(registerInfo).subscribe({
      next: (data) => {
        const authData: IToken = data;
        window.localStorage.setItem('RSClone-socnetwork', JSON.stringify(authData));
        window.location.assign(`/user/${authData._id}`);
      },
      error: (e) => {
        if (Array.isArray(e.message)) {
          this.errorMessage = e.message;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
