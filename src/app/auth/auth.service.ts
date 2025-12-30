import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  login(email: string, password: string): Observable<string> {
    const token = `fake-token-${email}-${Date.now()}`;
    localStorage.setItem(this.tokenKey, token);
    return of(token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }
}
