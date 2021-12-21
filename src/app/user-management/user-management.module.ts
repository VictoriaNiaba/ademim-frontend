import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingCreateFormComponent } from './components/training-create-form/training-create-form.component';
import { TrainingListComponent } from './components/training-list/training-list.component';
import { UserManagementPageComponent } from './components/user-management-page/user-management-page.component';
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
  declarations: [
    UserManagementPageComponent,
    TrainingListComponent,
    TrainingCreateFormComponent,
  ],
  imports: [SharedModule, UserManagementRoutingModule, HttpClientModule],
})
export class UserManagementModule {}
