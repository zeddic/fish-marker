import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MapComponent } from './map/map.component';
import { CatchesComponent } from './catches/catches.component';
import { CatchItemComponent } from './catches/catch-item/catch-item.component';
import { MobileComponent } from './navigation/mobile/mobile.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BUCKET } from '@angular/fire/compat/storage';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MapComponent,
		CatchesComponent,
		CatchItemComponent,
		MobileComponent,
		ProfileComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		ReactiveFormsModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		AngularFirestoreModule
	],
	providers: [
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase },
		{ provide: BUCKET, useValue: environment.firebase.storageBucket }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
