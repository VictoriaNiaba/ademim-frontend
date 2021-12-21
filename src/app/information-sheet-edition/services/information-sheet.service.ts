import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
