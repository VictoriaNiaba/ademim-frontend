import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleName } from '../../model/role';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  defaultPagePerRole = new Map<RoleName, string>();

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.defaultPagePerRole.set(RoleName.ADMINISTRATOR, 'utilisateurs');
    this.defaultPagePerRole.set(RoleName.STUDENT, 'editer-ma-fiche');
    this.defaultPagePerRole.set(RoleName.TEACHER, 'fiches-de-renseignement');

    this.loginForm = this.fb.group({
      email: ['sionne.niaba@gmail.com', Validators.required],
      password: ['pwd', Validators.required],
    });
  }

  tryLogin(): void {
    this.authenticationService
      .login({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe((userAccount) => {
        this.router.navigate([
          this.defaultPagePerRole.get(userAccount.roles[0].name),
        ]);
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
