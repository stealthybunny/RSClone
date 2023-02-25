import { environment } from './../../../environments/environment';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IImage, IToken, IUser } from 'src/app/models/types';
import { DataTransportService } from 'src/app/services/data-transport.service';
import { HeaderModalService } from 'src/app/services/header-modal.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { HeaderModalComponent } from '../header-modal/header-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('changeAvatar', ['$event'])
  public userData: IUser;
  public userAvatar: string | undefined;
  userPath: string;
  ursersList: IUser[] = [];
  filtredUsers: IUser[] = [];
  isVisible = false;
  api = environment.apiUrl;
  userLofinInfo = JSON.parse(
    window.localStorage.getItem('RSClone-socnetwork') as string
  ) as IToken;
  @ViewChild('search') search: ElementRef;

  constructor(
    public loginService: LoginServiceService,
    public headerModalService: HeaderModalService,
    public dataTransport: DataTransportService,
    private userService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.dataTransport.sub.subscribe((data: any) => {
      console.log('HeaderData', data);
      this.userAvatar = `${environment.apiUrl}/${data.imgLink}`;
    });
    const authData = JSON.parse(
      window.localStorage.getItem('RSClone-socnetwork') as string
    );
    this.loginService
      .getYourPage(authData._id, authData.token)
      .subscribe((data) => {
        this.userPath = `/user/${data._id}`;
        this.userAvatar = `${environment.apiUrl}/${data.avatar.imgLink}`;
      });
    this.userService.getUsers(this.userLofinInfo.token).subscribe({
      next: (data) => {
        console.log(data);
        this.ursersList = data;
        this.filtredUsers = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onInput() {
    let value = this.search.nativeElement.value;
    if (value) {
      this.isVisible = true;
      this.filtredUsers = this.ursersList.filter((e) =>
        e.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }
    console.log('input');
  }

  onFocuseOut() {
    setTimeout(() => {
      this.filtredUsers = this.ursersList;
      this.search.nativeElement.value = '';
      this.isVisible = false;
    }, 2000);
  }
}
