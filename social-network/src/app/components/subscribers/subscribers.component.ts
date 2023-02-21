import { environment } from './../../../environments/environment';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IUser } from 'src/app/models/types';
import { SubsModalServiceService } from 'src/app/services/subs-modal-service.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
})
export class SubscribersComponent implements OnInit, OnChanges {
  @Input() id: string;
  oldID: string;
  @Input() token: string;
  @Input() subscribers: IUser[] = [];
  api: string;

  constructor(
    public subModalService: SubsModalServiceService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.api = environment.apiUrl;
  }

  ngOnInit(): void {
    this.api = environment.apiUrl;
  }
}

