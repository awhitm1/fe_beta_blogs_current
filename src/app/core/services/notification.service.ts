import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Create a subject to listen to the pusher event
	notification$: Subject<any> = new Subject<any>();
	pusher: any;
	channel: any;

	constructor() {}

	// Listen to the pusher event
	listen(userId: number) {
		this.pusher = new Pusher(environment.pusher.key, {
			cluster: environment.pusher.cluster,
		});
		// Subscribe to the channel, using the user id
		this.channel = this.pusher.subscribe(userId.toString());

		// Listen to the like event made by the API
		this.channel.bind('like', (data: any) => {
			// Set the notification to the data received from the event
			this.setNotification(data.notification);
		});
	}

	setNotification(notifications: any): void {
		this.notification$.next(notifications);
	}
}
