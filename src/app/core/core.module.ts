import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './security/components/login/login.component';
import { ForbiddenPageComponent } from './security/components/forbidden-page.component';

@NgModule({
  declarations: [LoginComponent, ForbiddenPageComponent],
  imports: [SharedModule],
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
})
export class CoreModule {}
