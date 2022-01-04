import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Training } from '../../model/training';
import { TrainingService } from '../../services/training.service';
import { TrainingCreateFormComponent } from '../training-create-form/training-create-form.component';

@Component({
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent {
  data: Training[] = [];
  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService
  ) {}
  eventEmitter: EventEmitter<any> = new EventEmitter();

  openCreateGroupDialog() {
    const dialogRef = this.dialog.open(TrainingCreateFormComponent, {
      maxWidth: '60rem',
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.trainingService.getTrainingHistory().subscribe((data) => {
        this.data = data;
        this.eventEmitter.emit(this.data);
      });
    });
  }
}
