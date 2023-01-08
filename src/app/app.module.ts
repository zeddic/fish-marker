import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MapComponent } from './map/map.component';
import { CatchesComponent } from './catches/catches.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MapComponent,
		CatchesComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
