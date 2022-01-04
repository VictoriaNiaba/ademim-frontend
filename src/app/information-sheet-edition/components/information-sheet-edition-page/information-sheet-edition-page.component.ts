import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditPersonalInfoComponent } from 'src/app/user-management/components/edit-personal-info/edit-personal-info.component';
import { InformationSheet } from '../../model/information-sheet';
import { InformationSheetService } from '../../services/information-sheet.service';

@Component({
  selector: 'ae-information-sheet-edition-page',
  templateUrl: './information-sheet-edition-page.component.html',
  styleUrls: ['./information-sheet-edition-page.component.scss'],
})
export class InformationSheetEditionPageComponent implements OnInit {
  myInformationSheet$: Observable<InformationSheet>;
  answers$: Observable<InformationSheet>;

  constructor(
    private informationSheetService: InformationSheetService,
    public dialog: MatDialog
  ) {
    this.myInformationSheet$ =
      this.informationSheetService.findMyInformationSheet();
  }

  ngOnInit(): void {
    this.answers$ = this.informationSheetService.findAnswers();
    this.informationSheetService.findAnswers().subscribe((r) => console.log(r));
  }

  openEditPersonalInfo() {
    const dialogRef = this.dialog.open(EditPersonalInfoComponent, {
      maxWidth: '90%',
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.answers$ = this.informationSheetService.findAnswers();
    });
  }
}
