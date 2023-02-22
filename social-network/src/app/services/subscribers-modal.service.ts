import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersModalService {

  isCalled$ = new BehaviorSubject<boolean>(false);

  open() {
    console.log('subscribers open')

    this.isCalled$.next(true)

  }

  close() {
    console.log('subscribers close')
    this.isCalled$.next(false)
  }
}
