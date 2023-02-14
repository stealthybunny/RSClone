import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { pipe, tap } from 'rxjs';
import { IImage } from 'src/app/models/types';
import { UserPageComponent } from 'src/app/pages/user-page/user-page.component';
import { AvatarChangeMenuService } from 'src/app/services/avatar-change-menu.service';
import { EditProfileService } from 'src/app/services/edit-profile.service';

@Component({
  selector: 'app-avatar-change-menu',
  templateUrl: './avatar-change-menu.component.html',
  styleUrls: ['./avatar-change-menu.component.scss']
})
export class AvatarChangeMenuComponent implements OnInit {
  form: FormGroup
  isDisabled: boolean = false
  picture: File
  userID: string
  userToken: string
  error: { statusCode: number; message: string } | null
  @ViewChild('file') file: ElementRef
  @ViewChild('inputFile') inputRef: ElementRef
  photoPreview: string | ArrayBuffer | null = '';
  @Input() avatar: IImage;

  constructor(
    public avatarChangeModalService: AvatarChangeMenuService,
    public editProfileService: EditProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userPage: UserPageComponent
  ) {

  }

  onSubmit() {
    this.isDisabled = true;
    const formData = new FormData();
    formData.append('file', this.form.get('file')!.value);
    this.avatarChangeModalService.upload(formData, this.userToken).subscribe({
      next: (data) => {
        window.location.assign(`/user/${this.userID}`)
        console.log(data);
        this.file.nativeElement.value = null;
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.error = e;
        this.isDisabled = false;
      },
      
    });
  }

  onFileChange(event: any) {
    console.log('change');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file')!.setValue(file);
      console.log(this.form);
      this.error = null;
      const reader = new FileReader();
      reader.onload = () => {
      this.photoPreview = reader.result;
    }
    reader.readAsDataURL(file);
    }
    
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }


  ngOnInit(): void {
    // this.form = new FormGroup({
    //   file: new FormControl()
    // })


    this.form = this.formBuilder.group({
      file: '',
    });


    
    const auth = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string);
    this.userID = auth._id;
    this.userToken = auth.token;
  }

}
