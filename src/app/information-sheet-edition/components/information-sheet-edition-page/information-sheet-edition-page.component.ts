import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationSheet } from '../../model/information-sheet';
import { InformationSheetService } from '../../services/information-sheet.service';

@Component({
  selector: 'ae-information-sheet-edition-page',
  templateUrl: './information-sheet-edition-page.component.html',
  styleUrls: ['./information-sheet-edition-page.component.scss'],
})
export class InformationSheetEditionPageComponent {
  myInformationSheet$: Observable<InformationSheet>;

  constructor(private informationSheetService: InformationSheetService) {
    this.myInformationSheet$ =
      this.informationSheetService.findMyInformationSheet();
  }
}
