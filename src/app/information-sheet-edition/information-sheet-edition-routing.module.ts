import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationSheetEditionPageComponent } from './components/information-sheet-edition-page/information-sheet-edition-page.component';

const routes: Routes = [
  {
    path: '',
    component: InformationSheetEditionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationSheetEditionRoutingModule {}
