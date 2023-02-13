import { Component, Input, OnInit } from '@angular/core';
import { IImage } from 'src/app/models/types';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.scss']
})

export class AvatarModalComponent implements OnInit{
  token: string;
  @Input() avatar: IImage;

  constructor(
    public editProfileService: EditProfileService,
    public avatarChangeMenuService: AvatarChangeMenuService
  ) {

  }
  ngOnInit(): void {
    this.token = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
  }

}
