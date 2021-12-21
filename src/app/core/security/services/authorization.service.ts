import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAccount } from 'src/app/core/security/model/user-account';
import { Role, RoleName } from '../model/role';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private userRoles = new ReplaySubject<RoleName[]>(1);

  constructor(private authenticationService: AuthenticationService) {
    const userAccount$ = this.authenticationService.currentUserAccount$;

    userAccount$
      .pipe(map((userAccount) => this.extractRoles(userAccount)))
      .subscribe(this.userRoles);
  }

  private extractRoles(userAccount: UserAccount | null): RoleName[] {
    const roles: Role[] = userAccount ? userAccount.roles : [];
    return roles.map((role) => role.name);
  }

  hasRole$(requiredRole: RoleName): Observable<boolean> {
    return this.userRoles.pipe(
      map((userRoles) => userRoles.includes(requiredRole))
    );
  }
}
