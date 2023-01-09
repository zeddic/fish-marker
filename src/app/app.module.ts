import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MapComponent } from './map/map.component';
import { CatchesComponent } from './catches/catches.component';
import { CatchItemComponent } from './catches/catch-item/catch-item.component';
import { MobileComponent } from './navigation/mobile/mobile.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MapComponent,
		CatchesComponent,
		CatchItemComponent,
		MobileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
