import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { IUser } from 'src/app/models/types';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';

@Component({
  selector: 'app-subscribtions',
  templateUrl: './subscribtions.component.html',
  styleUrls: ['./subscribtions.component.scss'],
})
export class SubscribtionsComponent implements OnInit {
  token: string;
  @Input() subscriptions: IUser[];

  api: string;

  constructor(
    public subModalService: SubsModalServiceService
  ) {}
  ngOnInit(): void {
    this.api = environment.apiUrl;
  }
}
