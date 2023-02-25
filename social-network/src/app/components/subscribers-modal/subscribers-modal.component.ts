import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/types';
import { SubscribersModalService } from 'src/app/services/subscribers-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscribers-modal',
  templateUrl: './subscribers-modal.component.html',
  styleUrls: ['./subscribers-modal.component.scss']
})
export class SubscribersModalComponent implements OnInit{
  @Input() subscribers: IUser[] = [];
  api: string;

  constructor(
    public subscribersModalService: SubscribersModalService
  ) {

  }
  ngOnInit(): void {
    this.api = environment.apiUrl;
  }

}
