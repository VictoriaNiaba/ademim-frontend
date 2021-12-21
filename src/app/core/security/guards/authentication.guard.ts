import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router, UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authenticationService.authenticated$.pipe(
      first(),
      map((authenticated: boolean) => {
        return authenticated || this.router.parseUrl('/connexion');
      }),
      catchError(() => of(this.router.parseUrl('/connexion')))
    );
  }
}
