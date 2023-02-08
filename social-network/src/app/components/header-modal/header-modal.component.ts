import { Component } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent {

  deleteToken() {
    window.localStorage.removeItem('RSClone-socnetwork')
  }

}
