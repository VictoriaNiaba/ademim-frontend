import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Training } from 'src/app/information-sheet-edition/model/information-sheet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private httpClient: HttpClient) {}

  private url = `${environment.backendUrl}/trainings`;

  creatStudentTraining(training: Training): Observable<void> {
    return this.httpClient.post<void>(
      environment.backendUrl + '/add_students_training',
      training
    );
  }

  getGroups(sort: string, order: SortDirection, page: number): Observable<any> {
    const requestUrl = `${this.url}?sort=${sort}&order=${order}&page=${page}`;

    return this.httpClient.get<any>(requestUrl);
  }
}
