import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenPageComponent } from './core/security/components/forbidden-page.component';
import { LoginComponent } from './core/security/components/login/login.component';
import { AuthenticationGuard } from './core/security/guards/authentication.guard';
import { RoleGuard } from './core/security/guards/role.guard';
import { RoleName } from './core/security/model/role';

const routes: Routes = [
  {
    path: 'utilisateurs',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    data: {
      roleName: RoleName.ADMINISTRATOR,
    },
    canActivate: [AuthenticationGuard, RoleGuard],
  },
  {
    path: 'editer-ma-fiche',
    loadChildren: () =>
      import(
        './information-sheet-edition/information-sheet-edition.module'
      ).then((m) => m.InformationSheetEditionModule),
    data: {
      roleName: RoleName.STUDENT,
    },
    canActivate: [AuthenticationGuard, RoleGuard],
  },
  {
    path: 'connexion',
    component: LoginComponent,
  },
  {
    path: '403',
    component: ForbiddenPageComponent,
  },
  {
    path: '**',
    redirectTo: 'utilisateurs',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
