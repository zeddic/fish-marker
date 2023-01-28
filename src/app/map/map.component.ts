import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Modal } from 'bootstrap';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/user.service';
import { Timestamp } from '@angular/fire/firestore';
import { CatchesService } from '../catches/catches.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	host: { 'class': 'flex-grow-1' }
})
export class MapComponent implements OnInit {
	// https://github.com/angular/angularfire/issues/3290#issuecomment-1367299606
	clickLocation: any;
	catches: any[] = [];
	map!: any;
	user!: any;

	catchForm = new FormGroup({
		'type': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'lbs': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'oz': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'rig': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'bait': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'lat': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'lng': new FormControl('', { nonNullable: true, validators: [Validators.required] })
	});

	constructor(private firestore: AngularFirestore, private userService: UserService, private catchesService: CatchesService) { }

	ngOnInit() {
		// Initialise loaded for map
		let loader = new Loader({
			apiKey: environment.firebase.mapApiKey
		});

		// Fetch the user details
		this.userService.userDetails.pipe(first()).subscribe(user => {
			this.user = user;

			// Load the map
			loader.load().then(() => {
				// Initialise Map
				this.map = new google.maps.Map(document.getElementById('map')!, {
					center: this.getLocation(),
					zoom: 20,
					mapTypeId: 'satellite',
					tilt: 0
				});

				// Fetch list of catches from firebase
				this.catchesService.userCatches.subscribe(documents => {
					// Save documents to catches array
					if (documents !== null) {
						this.catches = documents;
					}
					for (let i = 0; i < this.catches.length; i++) {
						// Create marker and add to existing array item for catch
						this.catches[i].marker = new google.maps.Marker({
							position: { lat: this.catches[i].lat, lng: this.catches[i].lng },
							map: this.map,
							draggable: true,
							label: (i + 1).toString()
						});
						// Add click listener to marker to show details
						this.catches[i].marker.addListener("click", () => {
							new google.maps.InfoWindow({
								content: `<div id="content">
												<h1 id="firstHeading" class="firstHeading">${this.catches[i].type}</h1>
												<img src="assets/fish_example.jpg" class="card-img-top" alt="...">
												<div id="bodyContent">
													<p class="mb-0"><strong>Weight:</strong> ${this.catches[i].lbs} Lbs ${this.catches[i].oz} oz</p>
													<p class="mb-0"><strong>Bait:</strong> ${this.catches[i].bait}</p>
													<p class="mb-0"><strong>Rig:</strong> ${this.catches[i].rig}</p>
												</div>
											</div>`,
								ariaLabel: "Uluru",
							}).open({
								anchor: this.catches[i].marker,
								map: this.map,
							});
						});
					}
				});

				// On click of map, add new marker to map
				this.map.addListener('click', (mapsMouseEvent: any) => {
					let location = mapsMouseEvent.latLng.toJSON();
					// Add click location to marker form
					this.catchForm.patchValue({
						lat: location.lat,
						lng: location.lng
					});

					const element = document.getElementById('add-catch-modal') as HTMLElement;
					const myModal = new Modal(element);
					myModal.show();
				});
			});
		});
	}

	addCatch() {
		if (this.catchForm.valid) {
			// Get values of form then and user id
			let formValues: any = this.catchForm.value;
			formValues.uid = this.user.uid;
			formValues.createdAt = Timestamp.now();
			// Send data to firebase
			this.firestore.collection('catches').add(formValues).then(res => {
				// Once added clear form and add marker to map with click event
				this.catchForm.reset();
				formValues.marker = new google.maps.Marker({
					position: { lat: formValues.lat, lng: formValues.lng },
					map: this.map,
					draggable: true,
					label: (this.catches.length + 1).toString()
				});
				// Add click listener to marker to show details
				formValues.marker.addListener("click", () => {
					new google.maps.InfoWindow({
						content: `<div id="content">
										<h1 id="firstHeading" class="firstHeading">${formValues.type}</h1>
										<img src="assets/fish_example.jpg" class="card-img-top" alt="...">
										<div id="bodyContent">
											<p class="mb-0"><strong>Weight:</strong> ${formValues.weight}</p>
											<p class="mb-0"><strong>Bait:</strong> ${formValues.bait}</p>
											<p class="mb-0"><strong>Rig:</strong> ${formValues.rig}</p>
										</div>
									</div>`,
						ariaLabel: "Uluru",
					}).open({
						anchor: formValues.marker,
						map: this.map,
					});
				});
				// Add new catch to local array
				this.catches.push(formValues);
				this.catchesService.userCatches.next(this.catches);
				const element = document.getElementById('close-bootstrap-modal') as HTMLElement;
				element.click();
			});
		}
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
			return { lat: 53.391991, lng: -3.178860 };
		} else {
			return { lat: 53.391991, lng: -3.178860 };
		}
	}
}