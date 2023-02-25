import { environment } from './../../../environments/environment';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IUser } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';

@Component({
  selector: 'app-subscriptions-modal',
  templateUrl: './subscriptions-modal.component.html',
  styleUrls: ['./subscriptions-modal.component.scss'],
})
export class SubscriptionsModalComponent implements OnInit, OnChanges {
  @Input() id: string = '';
  subs: IUser[];
  output: IUser[];
  offline: IUser[];
  onnline: IUser[];
  first: boolean = true;
  second: boolean = false;
  third: boolean = false;
  api: string;

  constructor(
    private loginService: LoginServiceService,
    public subModalService: SubsModalServiceService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.api = environment.apiUrl;
    const token = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    ).token;
    this.loginService.getYourPage(this.id, token).subscribe((data) => {
      this.subs = data.subscriptions;
      console.log(this.subs);
      this.output = this.subs;
    });
  }

  getAllSubs() {
    this.output = this.subs;
    this.first = true;
    this.second = false;
    this.third = false;
  }

  getOnlineSubs() {
    this.output = this.subs.filter((el) => el.isOnline);
    this.first = false;
    this.second = true;
    this.third = false;
  }

  getOfflineSubs() {
    this.output = this.subs.filter((el) => !el.isOnline);
    this.first = false;
    this.second = false;
    this.third = true;
  }
}
