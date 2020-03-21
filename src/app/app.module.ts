import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'

export function getWindow() {
	return typeof window !== 'undefined' ? window : null;
}

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule, MatSnackBarModule],
	providers: [{provide: 'WINDOW', useFactory: getWindow}],
	bootstrap: [AppComponent],
})
export class AppModule {}
