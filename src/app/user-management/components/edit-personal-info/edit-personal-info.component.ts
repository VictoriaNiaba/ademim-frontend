import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationSheetService } from 'src/app/information-sheet-edition/services/information-sheet.service';
import { Section } from '../../../information-sheet-edition/model/information-sheet';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AnswerDto } from '../../model/answer-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ae-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.scss'],
})
export class EditPersonalInfoComponent implements OnInit {
  editPersonalInfoFormGroup: FormGroup;
  section: Section;
  questions$: Observable<any>;
  questionList: any = [];
  situation = [
    'Je cherche un sujet de Doctorat',
    'Je suis en 1ère année',
    'Je suis en 2ème année',
    'Je suis en 3ème année',
    'Je suis en 4ème année',
    "J'ai terminé mon doctorat'",
  ];
  employmentResearch = [
    "Embauche à l'issue du stage",
    'Embauche à la fin du stage dans une autre entreprise',
    'moins de 3 mois',
    'Entre 3 et 6 mois',
    'Entre 6 et 12 mois',
    'Plus de 12 mois',
    'Insertion professionnelle non réalisée',
  ];
  contractType = [
    'Pas de réponse',
    'Chargé de veille ou de recherche',
    'Chef de projet (assistant ou confirmé)',
    'Chef de projet en informatique graphique)',
    'Consultant fonctionnel',
    'Consultant technique',
    'Data analyst',
    'Développeur graphique',
  ];
  salary = ['<25000€', 'de 25000€ à 31000€', 'de xxxxx€', 'xxxx€', 'xxxxx€'];

  constructor(
    private formBuilder: FormBuilder,
    private informationSheetService: InformationSheetService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditPersonalInfoComponent>
  ) {}

  ngOnInit(): void {
    this.informationSheetService.findMyInformationSheet().subscribe((info) => {
      this.section = info.sections[0];

      this.questions$ = this.informationSheetService.findQuestions(
        this.section.title
      );
      this.informationSheetService
        .findQuestions(this.section.title)
        .subscribe((q) => {
          this.questionList.length = 0;
          this.questionList = [...q.map((e) => e.label)];
        });
    });
    this.editPersonalInfoFormGroup = this.formBuilder.group({
      situation: ['', Validators.required],
      doctoratSubject: ['', Validators.required],
      laboName: ['', Validators.required],
      comment: [''],
      employment: [''],
      contract: [''],
      function_name: [''],
      salary: [''],
      company: [''],
    });
  }

  onFormSubmit() {
    if (!this.editPersonalInfoFormGroup.valid) {
      return;
    }

    if (this.section.title === 'Recherche') {
      let answer: AnswerDto = {
        section: this.section.title,
        situation: {
          key: this.questionList[0],
          value: this.editPersonalInfoFormGroup.value.situation,
        },
        doctoratSubject: {
          key: this.questionList[1],
          value: this.editPersonalInfoFormGroup.value.doctoratSubject,
        },
        laboName: {
          key: this.questionList[2],
          value: this.editPersonalInfoFormGroup.value.laboName,
        },
        comment: {
          key: this.questionList[3],
          value: this.editPersonalInfoFormGroup.value.comment,
        },
      };
      console.log('answer', answer);
      this.informationSheetService.saveAnswers(answer).subscribe(
        (response) => {
          this.openSnackBar('Réponses créées !', 'success');
          this.dialogRef.close();
        },
        (error) => {
          this.openSnackBar("Impossible d'ajouter ces réponses", 'alert');
        }
      );
    }
  }

  openSnackBar(message: string, color: 'success' | 'alert') {
    this.snackBar.open(message, undefined, {
      panelClass: [`${color}-snackbar`],
      duration: 8000,
    });
  }
}
