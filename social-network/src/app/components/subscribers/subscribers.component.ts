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
  @Input() token: string;
  @Input() subscribers: IUser[] = [];
  // @Input() subscribersCount: number;
  api: string;

  constructor(
    private loginService: LoginServiceService,
    public subModalService: SubsModalServiceService
    ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('subscribers', this.subscribers);
    // this.getListOfSUbscribers(this.id)

    this.api = pathToAPI;
  }
  
  ngOnInit(): void {
    console.log(this.subscribers)
    // this.token = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
    // this.getListOfSUbscribers(this.id)

    // this.oldID = this.id;
    
    // console.log('subscribers', this.subscribers);
    this.api = pathToAPI;
  }

  // getListOfSUbscribers(id: string) {

  //   console.log('token',this.token)
  //   this.loginService.getYourPage(id, this.token).subscribe({
  //     next: (data) => {
  //       console.log('data', data)
  //       this.subscribers = data.subscribers;
  //       console.log('subscribers',this.subscribers)
  //     },
  //     error: (e) => {
  //       console.log(e)
  //     }
  //   })

  // }
}

