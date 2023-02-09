import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { IUser } from '../models/types';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUser> {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
    ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    const token = JSON.parse(window.localStorage.getItem('RSClone-socnetwork') as string).token;
    const id = route.params?.['id'];
    return this.loginService.getYourPage(id, token).pipe(
      catchError(() => {
        this.router.navigate(['find']);
        return EMPTY;
      })
    )
  }
}
