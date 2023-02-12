import { Component } from '@angular/core';
import { EditProfileService } from 'src/app/services/edit-profile.service';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.scss']
})
export class AvatarModalComponent {
  constructor(
    public editProfileService: EditProfileService
  ) {

  }

}
