import {Injectable} from '@angular/core';
import {Workbox} from 'workbox-window';
import {Subject, BehaviorSubject} from 'rxjs';
import {NativeNotificationService} from './native-notification.service';

@Injectable({
	providedIn: 'root',
})
export class WorkBoxService {
	wb: Workbox;
	swVersion = new BehaviorSubject('');
	constructor(private notify: NativeNotificationService) {}
	async getServiceWorkerVersion() {
		this.swVersion.next(await this.wb.messageSW({type: 'GET_VERSION'}));
		console.log('Service Worker version:', this.swVersion.value);
	}
	getServiceWorkerMessages() {
		if ('serviceWorker' in navigator) {
			this.wb = new Workbox('/sw.js');
			this.activated();
			this.waiting();
			this.message();
			this.installed();
			this.controling();
			this.blockedByThisTab();
			this.newVersionActivatedOnAnotherTab();
			this.newVersionInstalledOnAnotherTab();
			this.wb.register();
		}
	}
	private activated() {
		this.wb.addEventListener('activated', event => {
			// `event.isUpdate` will be true if another version of the service
			// worker was controlling the page when this version was registered.
			if (!event.isUpdate) {
				event.claim();
				console.log('Service worker activated for the first time!');
				// If your service worker is configured to precache assets, those
				// assets should all be available now.
			}
		});
	}
	private installed() {
		this.wb.addEventListener('installed', event => {
			if (!event.isUpdate) {
				console.log('Service worker installed for the first time!');
				// First-installed code goes here...
			}
		});
	}
	private waiting() {
		this.wb.addEventListener('waiting', event => {
			this.notify.notifyUser({
				header: 'New update have arrived!',
				message: `We've just released a new version of our application`,
			});
			console.log(
				`A new service worker has installed, but it can't activate` +
					`until all tabs running the current version have fully unloaded.`,
			);
		});
	}
	private message() {
		this.wb.addEventListener('message', event => {
			if (event.data.type === 'CACHE_UPDATED') {
				const {updatedURL} = event.data.payload;

				console.log(`A newer version of ${updatedURL} is available!`);
			}
		});
	}
	private controling() {
		this.wb.addEventListener('controling', event => {
			console.log(`Service worker is in control of the page`);
		});
	}
	private newVersionInstalledOnAnotherTab() {
		this.wb.addEventListener('externalinstalled', event => {
			console.log(`Newer version of the app is running on another tab`);
		});
	}
	private blockedByThisTab() {
		this.wb.addEventListener('externalwaiting', event => {
			console.log(`Another tab update is blocked by this tab.`);
		});
	}
	private newVersionActivatedOnAnotherTab() {
		this.wb.addEventListener('externalactivated', event => {
			console.log(`Another tab update is blocked by this tab.`);
		});
	}
}
