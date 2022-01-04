import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerDto } from 'src/app/user-management/model/answer-dto';
import { environment } from 'src/environments/environment';
import { InformationSheet } from '../model/information-sheet';

@Injectable({
  providedIn: 'root',
})
export class InformationSheetService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.backendUrl;

  findMyInformationSheet(): Observable<InformationSheet> {
    return this.httpClient.get<InformationSheet>(
      `${this.baseUrl}/students/myself/information-sheet`
    );
  }
  findQuestions(title: string): Observable<any> {
    let params = new HttpParams().append('title', title);
    return this.httpClient.get<any>(`${this.baseUrl}/questions`, { params });
  }
  findAnswers(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/answers`);
  }

  public saveAnswers(answers: AnswerDto): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/save-answers', answers);
  }
}
