import { ChatsService } from './../services/chats.service';
import { IChat } from './../models/types';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsResolver implements Resolve<IChat> {
  constructor(private chatsService: ChatsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IChat> {
    return this.chatsService.getOneChat(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['chats']);
        return EMPTY;
      })
    ) as Observable<IChat>;
  }
}
