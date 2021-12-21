import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../model/credentials';
import { UserAccount } from '../model/user-account';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = `${environment.backendUrl}`;

  private currentUserSubject = new ReplaySubject<UserAccount | undefined>(1);
  get currentUserAccount$(): Observable<UserAccount | undefined> {
    return this.currentUserSubject.asObservable();
  }
  get authenticated$(): Observable<boolean> {
    return this.currentUserAccount$.pipe(
      map((userAccount) => (userAccount ? true : false))
    );
  }

  get loginUrl(): string {
    return `${this.baseUrl}/user`;
  }

  constructor(private http: HttpClient) {
    this.login().subscribe();
  }

  login(credentials?: Credentials): Observable<UserAccount> {
    return this.sendLoginRequest(credentials).pipe(
      tap((userAccount: UserAccount) =>
        this.currentUserSubject.next(userAccount)
      ),
      catchError((err) => {
        this.currentUserSubject.next();
        return throwError(err);
      })
    );
  }

  private sendLoginRequest(credentials?: Credentials) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              `Basic ` +
              btoa(`${credentials.username}:${credentials.password}`),
          }
        : {}
    );
    return this.http.get<UserAccount>(this.loginUrl, { headers });
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/logout`, {})
      .pipe(finalize(() => this.currentUserSubject.next()));
  }
}
