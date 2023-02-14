import { Component } from '@angular/core';
import { HeaderModalService } from 'src/app/services/header-modal.service';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent {
  constructor(
    public headerModalService: HeaderModalService
  ) {

  }

  deleteToken() {
    window.localStorage.removeItem('RSClone-socnetwork')
  }

}
