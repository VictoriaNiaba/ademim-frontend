import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { RoleName } from '../model/role';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const roleName = route.data.roleName as RoleName;

    return this.authorizationService.hasRole$(roleName).pipe(
      first(),
      map((hasRole: boolean) => {
        return hasRole || this.router.parseUrl('/403');
      }),
      catchError(() => of(this.router.parseUrl('/403')))
    );
  }
}
