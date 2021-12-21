import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InformationSheetEditionPageComponent } from './components/information-sheet-edition-page/information-sheet-edition-page.component';
import { InformationSheetEditionRoutingModule } from './information-sheet-edition-routing.module';

@NgModule({
  declarations: [InformationSheetEditionPageComponent],
  imports: [SharedModule, InformationSheetEditionRoutingModule],
})
export class InformationSheetEditionModule {}
