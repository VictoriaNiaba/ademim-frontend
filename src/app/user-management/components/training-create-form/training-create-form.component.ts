import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Papa from 'papaparse';
import { Student } from '../../model/student';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'ae-group-create-form',
  templateUrl: './training-create-form.component.html',
  styleUrls: ['./training-create-form.component.scss'],
})
export class TrainingCreateFormComponent {
  studentGroupForm: FormGroup;

  private readonly INVALID_CSV =
    "Le groupe n'a pas pu être créé : les étudiants sont incorrectement formattés ou ils ont déjà été enregistrés en base de données.";
  private readonly GROUP_SUCCESSFULLY_CREATED =
    'Le groupe a été créé avec succès';

  constructor(
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TrainingCreateFormComponent>
  ) {
    this.studentGroupForm = this.formBuilder.group({
      name: [
        'Master Ingénierie du Logiciel et des Données 2020-2021',
        Validators.required,
      ],
      students: [
        'Victoria,Niaba,1997-04-13,linkedin.com/in/victoria-niaba/,victoria.niaba@gmail.com',
        Validators.required,
      ],
    });
  }

  onFormSubmit() {
    if (!this.studentGroupForm.valid) {
      return;
    }

    const header = 'firstname,lastname,dateOfBirth,linkedin,emailAddress\n';
    const results = Papa.parse(header + this.studentGroupForm.value.students, {
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
    });

    if (results.errors.length > 0) {
      this.openSnackBar(this.INVALID_CSV, 'alert');
    } else {
      const students = this.toStudents(results.data);

      this.trainingService
        .creatStudentTraining({
          name: this.studentGroupForm.value.name,
          students: students,
        })
        .subscribe(
          (response) => {
            this.openSnackBar(this.GROUP_SUCCESSFULLY_CREATED, 'success');
            this.dialogRef.close();
          },
          (error) => this.openSnackBar(this.INVALID_CSV, 'alert')
        );
    }
  }

  toStudents(rawStudents: any[]): Student[] {
    return rawStudents.map((rawStudent) => ({
      linkedin: rawStudent.linkedin,
      dateOfBirth: rawStudent.dateOfBirth,
      userAccount: {
        firstName: rawStudent.firstname,
        lastName: rawStudent.lastname,
        email: rawStudent.emailAddress,
      },
    }));
  }

  openSnackBar(message: string, color: 'success' | 'alert') {
    this.snackBar.open(message, undefined, {
      panelClass: [`${color}-snackbar`],
      duration: 8000,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.studentGroupForm.controls;
  }

  getNameErrorMessage() {
    return this.f.name.hasError('required') ? 'Le nom est requis' : '';
  }
  getStudentsErrorMessage() {
    return this.f.students.hasError('required')
      ? 'Les étudiants sont requis'
      : '';
  }
}
