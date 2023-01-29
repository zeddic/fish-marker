import { Component, OnDestroy, OnInit, resolveForwardRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Modal } from 'bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/user.service';
import { Timestamp } from '@angular/fire/firestore';
import { CatchesService } from '../catches/catches.service';
import { Catch } from '../catches/catch.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	host: { 'class': 'flex-grow-1' }
})
export class MapComponent implements OnInit, OnDestroy {
	// https://github.com/angular/angularfire/issues/3290#issuecomment-1367299606
	catches: Catch[] = [];
	catchSubscription!: Subscription;
	map!: any;

	// Create structure for catch form
	catchForm = new FormGroup({
		'type': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'lbs': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'oz': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'rig': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'bait': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'lat': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'lng': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'uid': new FormControl(this.userService.uid, { nonNullable: true, validators: [Validators.required] })
	});

	constructor(private firestore: AngularFirestore, private userService: UserService, private catchesService: CatchesService) { }

	ngOnInit() {
		// Initialise loader for map
		let loader = new Loader({
			apiKey: environment.firebase.mapApiKey
		});

		// Once loader is ready build map
		loader.load().then(() => {
			this.map = new google.maps.Map(document.getElementById('map')!, {
				center: this.getLocation(),
				zoom: 20,
				mapTypeId: 'satellite',
				tilt: 0
			});
			this.map.addListener('click', (mapsMouseEvent: any) => {
				// Get the location of the click event on map and add to form
				let location = mapsMouseEvent.latLng.toJSON();
				this.catchForm.patchValue({
					lat: location.lat,
					lng: location.lng
				});

				// Show the add catch modal
				const element = document.getElementById('add-catch-modal') as HTMLElement;
				const myModal = new Modal(element);
				myModal.show();
			});
		}).then(() => {
			// Loops through users catches and add them to the map
			this.catchSubscription = this.catchesService.userCatches.subscribe((catches: Catch[] | null) => {
				if (catches !== null) {
					this.catches = [];
					for (let catchItem of catches) {
						this.createMarker(catchItem);
					}
				}
			});
		});
	}

	addCatch() {
		if (this.catchForm.valid) {
			let catchFormValues: any = this.catchForm.value;
			catchFormValues.createdAt = Timestamp.now();
			this.catchesService.addCatch(catchFormValues);
			this.createMarker(catchFormValues);
			const element = document.getElementById('close-bootstrap-modal') as HTMLElement;
			element.click();
		}
	}

	createMarker(catchItem: Catch) {
		let marker = new google.maps.Marker({
			position: { lat: catchItem.lat, lng: catchItem.lng },
			map: this.map,
			label: (this.catches.length + 1).toString()
		});
		marker.addListener('click', () => {
			new google.maps.InfoWindow({
				content: `<div id="content">
							<h1 id="firstHeading" class="firstHeading">${catchItem.type}</h1>
							<img src="assets/fish_example.jpg" class="card-img-top" alt="...">
							<div id="bodyContent">
								<p class="mb-0"><strong>Weight:</strong> ${catchItem.lbs} Lbs ${catchItem.oz} oz</p>
								<p class="mb-0"><strong>Bait:</strong> ${catchItem.bait}</p>
								<p class="mb-0"><strong>Rig:</strong> ${catchItem.rig}</p>
							</div>
						</div>`
			}).open({
				anchor: marker,
				map: this.map
			});
		});
		this.catches.push({ ...catchItem, ...marker });
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				this.map.setCenter(pos);
				return pos;
			});
		}
		return { lat: 53.391991, lng: -3.178860 };
	}

	ngOnDestroy(): void {
		this.catchSubscription.unsubscribe();
	}
}