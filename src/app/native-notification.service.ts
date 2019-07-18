import {Injectable} from '@angular/core';

export interface Notification {
	message: string;
	header: string;
}

@Injectable({
	providedIn: 'root',
})
export class NativeNotificationService {
	constructor() {
		if (!('Notification' in window)) {
		}
	}
	notifyUser(data: Notification) {
		return new Notification(data.header || 'New changes!', {
			image:
				'https://firebasestorage.googleapis.com/v0/b/businessswop.appspot.com/o/logo.png?alt=media&token=10ff9eaf-b5f9-4947-9716-e6e310222218',
			body: data.message,
		});
	}
}
