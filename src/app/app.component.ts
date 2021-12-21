import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './core/security/services/authentication.service';

@Component({
  selector: 'ae-root',
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <span>Annuaire des étudiants</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/utilisateurs">Utilisateurs</a>
      <ng-container *ngIf="authenticated$ | async as authenticated">
        <button *ngIf="authenticated" mat-button (click)="logout()">
          Déconnexion
        </button>
      </ng-container>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .app-toolbar {
        height: 54px;
      }
    `,
  ],
})
export class AppComponent {
  authenticated$: Observable<boolean>;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    //this.authenticated$ = this.authenticationService.authenticated$;
    this.authenticated$ = of(true);
  }

  logout(): void {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/connexion']));
  }
}
