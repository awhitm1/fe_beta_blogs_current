import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { NotificationService } from './core/services/notification.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {}

	ngOnInit(): void {
		this.notificationService.notification$.subscribe((notification) => {
			this.snackBar.open(notification, 'Dismiss', {
				duration: 3000,
			});
		});
	}
}
