import {
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Training } from '../../model/training';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'ae-group-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  @Input() data: Training[] = [];

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private trainingService: TrainingService,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // If the user changes the sort order, reset back to the first page.

    this.trainingService.getTrainingHistory().subscribe((data) => {
      this.data = data;
    });
  }

  deleteItem(student) {
    console.log(this.data);
    let count = 0;
    this.trainingService.removeStudent(student).subscribe(
      (reponse) => {
        this.data = this.data.filter((d) => {
          return d.students.find(
            (e) => e.userAccount.email !== student.userAccount.email
          );
        });
        this.openSnackBar('Utilisateur supprimé', 'success');
      },
      (error) => {
        this.openSnackBar('Impossible de supprimer cet étudiant', 'alert');
      }
    );
  }

  openSnackBar(message: string, color: 'success' | 'alert') {
    this.snackBar.open(message, undefined, {
      panelClass: [`${color}-snackbar`],
      duration: 8000,
    });
  }
}
