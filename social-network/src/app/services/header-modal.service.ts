import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderModalService {
  isOpened$ = new BehaviorSubject<boolean>(false);

  open() {
    this.isOpened$.next(true)
    console.log(this.isOpened$.value)

  }

  close() {
    this.isOpened$.next(false)
    console.log(this.isOpened$.value)
  }
}
