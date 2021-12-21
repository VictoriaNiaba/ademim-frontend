import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingCreateFormComponent } from '../training-create-form/training-create-form.component';

@Component({
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent {
  constructor(public dialog: MatDialog) {}

  openCreateGroupDialog() {
    this.dialog.open(TrainingCreateFormComponent, {
      maxWidth: '60rem',
      width: '80%',
    });
  }
}
