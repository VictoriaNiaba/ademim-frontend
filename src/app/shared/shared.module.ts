import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickStopPropagation } from './directives/click-stop-propagation.directive';
import { MaterialModule } from './material/material.module';

const modules = [
  CommonModule,
  RouterModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
];

const directives = [ClickStopPropagation];

@NgModule({
  declarations: [...directives],
  imports: [...modules],
  exports: [...modules, ...directives],
})
export class SharedModule {}
