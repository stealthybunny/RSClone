import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersModalService {

  isCalled$ = new BehaviorSubject<boolean>(false);

  open() {

    this.isCalled$.next(true)

  }

  close() {
    this.isCalled$.next(false)
  }
}
