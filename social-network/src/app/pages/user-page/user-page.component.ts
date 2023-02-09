import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderModalComponent } from 'src/app/components/header-modal/header-modal.component';
import { IUser } from 'src/app/models/types';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { pathToAPI } from 'src/app/store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  user: IUser;
  userSubscription: Subscription;
  userAvatar: string;


  constructor(
    private route: ActivatedRoute,
    public headerModalService: HeaderModalService

  ) {

  }
  ngOnInit(): void {
    this.userSubscription = this.route.data.subscribe((data) => {
    this.user = data['data'];
    this.userAvatar = `${pathToAPI}/${this.user.avatar.imgLink}`;

    console.log(this.userAvatar)})
  }

}
