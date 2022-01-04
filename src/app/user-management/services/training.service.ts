import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Training } from '../model/training';

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

  getTrainingHistory(): Observable<Training[]> {
    //const requestUrl = `${this.url}?sort=${sort}&order=${order}&page=${page}`;
    const requestUrl = environment.backendUrl + '/getTrainingHistory';

    return this.httpClient.get<Training[]>(requestUrl);
  }
  removeStudent(student): Observable<any> {
    //const requestUrl = `${this.url}?sort=${sort}&order=${order}&page=${page}`;
    const requestUrl = environment.backendUrl + '/remove-student';

    return this.httpClient.post(requestUrl, student);
  }
}
