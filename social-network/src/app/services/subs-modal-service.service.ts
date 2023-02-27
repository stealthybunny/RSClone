import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsModalServiceService {

  isOpened$ = new BehaviorSubject<boolean>(false);

  open() {
    this.isOpened$.next(true)

  }

  close() {
    this.isOpened$.next(false)
  }
}
