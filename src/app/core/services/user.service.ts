import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserSubject = new BehaviorSubject<User | null>(null);

	constructor(private http: HttpClient) {}

	setCurrentUser(user: User | null) {
		this.currentUserSubject.next(user);
	}

	getBootstrapData() {
		return this.http.get(`${environment.apiUrl}/web/bootstrap`).pipe(
			tap((data: any) => {
				this.setCurrentUser(data.current_user);
			})
		);
	}
}
