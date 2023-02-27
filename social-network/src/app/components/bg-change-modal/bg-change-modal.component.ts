import { GalleryService } from 'src/app/services/gallery.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bg-change-modal',
  templateUrl: './bg-change-modal.component.html',
  styleUrls: ['./bg-change-modal.component.scss'],
})
export class BgChangeModalComponent implements OnInit {
  form: FormGroup;
  @Output() bgChange = new EventEmitter<{ link: string }>();
  isDisabled = false;
  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      link: new FormControl(''),
    });
  }

  onSubmit() {
    this.isDisabled = true;
    this.galleryService.changeUserBg(this.form.value).subscribe({
      next: (data) => {
        console.log(data);
        this.bgChange.emit(data);
        this.form.reset();
        this.isDisabled = false;
      },
      error: (e) => {
        console.log(e);
        this.isDisabled = false;
      },
    });
  }
}
