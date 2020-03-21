import {Injectable} from '@angular/core';
import {Workbox} from 'workbox-window';
import {Subject, BehaviorSubject, interval} from 'rxjs';
import {NativeNotificationService} from './native-notification.service';
const { BroadcastChannel } = require('broadcast-channel')
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
	providedIn: 'root',
})
export class WorkBoxService {
	wb: Workbox;
	swVersion = new BehaviorSubject('');
	workboxChannel: BroadcastChannel
	constructor(private notify: NativeNotificationService, private readonly snackBar: MatSnackBar) {
	}
	async getServiceWorkerVersion() {
		this.swVersion.next(await this.wb.messageSW({type: 'GET_VERSION'}));
		console.log('Service Worker version:', this.swVersion.value);
	}
	getServiceWorkerMessages() {
		if ('serviceWorker' in navigator) {
			this.wb = new Workbox('/sw.js');
			this.activated();
			this.installed();
			this.newVersionActivatedOnAnotherTab();
			this.newVersionInstalledOnAnotherTab();
			this.wb.register().then(reg => {
				interval(5000).subscribe(() => {
					reg.update()
					reg.onupdatefound = (event) => {
						console.log('UPDATE FOUND', event)
						this.askForAnUpdate(reg)
					}
				})
			  })
		};
	}
	private activated() {
		this.wb.addEventListener('activated', event => {
			// `event.isUpdate` will be true if another version of the service
			// worker was controlling the page when this version was registered.
			if (!event.isUpdate) {
				console.log('Service worker activated for the first time!');
				// If your service worker is configured to precache assets, those
				// assets should all be available now.
			}
		});
	}
	private installed() {
		this.wb.addEventListener('installed', event => {
		  if (event.isUpdate) {
			window.location.reload()
		  }
		})
	}
	private askForAnUpdate(reg) {
		this.snackBar.open(
			'There is a new version, would you like to update?',
			'Update',
			{
			  duration: undefined,
			}
		  ).onAction().subscribe(() => {
			  window.location.reload()
		  });
	}
	private newVersionInstalledOnAnotherTab() {
		this.wb.addEventListener('externalinstalled', event => {
			console.log(`Newer version of the app is running on another tab`, event);
			if (document.hidden) {
				window.location.reload()
			}
		});
	}
	private newVersionActivatedOnAnotherTab() {
		this.wb.addEventListener('externalactivated', event => {
			console.log(`Another tab update is blocked by this tab.`, event);
			if (document.hidden) {
				window.location.reload()
			}
		});
	}
}
