import { GalleryService } from './../services/gallery.service';
import { IImage } from './../models/types';
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
export class GalleryResolver implements Resolve<IImage[]> {
  constructor(private galleryService: GalleryService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IImage[]> {
    return this.galleryService.getImagesList(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['gallery']);
        return EMPTY;
      })
    ) as Observable<IImage[]>;
  }
}
