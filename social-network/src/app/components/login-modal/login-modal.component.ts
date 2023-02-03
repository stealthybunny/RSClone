import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit{
  form = new FormGroup({
    userName: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(4)
    ])
  })

  constructor(private loginService: LoginServiceService) {

  }

  submit() {
    console.log(this.form.value);
    const loginInfo: ILogin = {
      userName: this.form.value.userName as string,
      password: this.form.value.password as string
    }
    this.loginService.login(loginInfo)
  }
  


  // submit() {
  //   console.log(this.form.value)
  //   this.productService.create({
  //     title: this.form.value.title as string,
  //     price: 13.5,
  //     description: 'lorem ipsum set',
  //     image: 'https://i.pravatar.cc',
  //     category: 'electronic',
  //     rating: {
  //       rate: 42,
  //       count: 1
  //     }
  //   }).subscribe(() => {
  //     this.modalService.close()
  //   })
  // }
  
  ngOnInit(): void {

  }

}
