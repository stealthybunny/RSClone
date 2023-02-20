import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/models/types';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit, OnChanges{
  @Input() id: string;
  oldID: string;
  token: string;
  @Input() subscribers: IUser[];
 
  api: string;

  constructor(
    private loginService: LoginServiceService,
    public subModalService: SubsModalServiceService
    ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('subscribers', this.subscribers);
    this.api = pathToAPI;
  }
  
  ngOnInit(): void {
    console.log('subscribers', this.subscribers);
    this.api = pathToAPI;
  }
}
