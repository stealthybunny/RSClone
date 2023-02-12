import { Component, OnInit } from '@angular/core';
import { EditProfileService } from 'src/app/services/edit-profile.service';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.scss']
})
export class AvatarModalComponent implements OnInit{
  token: string;
  constructor(
    public editProfileService: EditProfileService
  ) {

  }
  ngOnInit(): void {
    this.token = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
  }

}
