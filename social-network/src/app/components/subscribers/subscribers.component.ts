import { environment } from './../../../environments/environment';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IUser } from 'src/app/models/types';
import { SubscribersModalService } from 'src/app/services/subscribers-modal.service';

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
  nograde: boolean = true;
  bronze: boolean = false;
  silver: boolean = false;
  gold: boolean = false;

  constructor(
    public subscribersModalService: SubscribersModalService,
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.api = environment.apiUrl;
  }

  ngOnInit(): void {
    this.api = environment.apiUrl;
  }
}

