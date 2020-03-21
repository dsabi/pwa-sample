import {Component, OnInit, Inject} from '@angular/core';
import {WorkBoxService} from './workbox.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	deferredPrompt: any;
	constructor(public workbox: WorkBoxService, @Inject('WINDOW') private window: any) {}
	ngOnInit() {
		this.workbox.getServiceWorkerMessages();
		this.window.addEventListener('beforeinstallprompt', event => {
			this.deferredPrompt = event;
			console.log('beforeinstallprompt fired');
		});
		this.window.addEventListener('appinstalled', evt => {
			console.log('pwa installed');
		});
		// this.workbox.getServiceWorkerVersion();
	}
	installApp(e) {
		this.deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		this.deferredPrompt.userChoice.then(choiceResult => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			this.deferredPrompt = null;
		});
	}
}
