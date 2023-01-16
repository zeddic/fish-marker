import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Modal } from 'bootstrap';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { first } from 'rxjs';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	host: { 'class': 'flex-grow-1' }
})
export class MapComponent implements OnInit {
	// https://github.com/angular/angularfire/issues/3290#issuecomment-1367299606
	clickLocation: any;
	catchesCollection!: AngularFirestoreCollection;
	catches: any[] = [];
	map!: any;

	constructor(private firestore: AngularFirestore) { }

	ngOnInit() {
		// Initialise loaded for map
		let loader = new Loader({
			apiKey: 'AIzaSyAFmtZ0FFDLTPmSlySZU2e5EA4NwdOt0Cg'
		});

		// Initialise Map and Markers
		loader.load().then(() => {
			// Initialise Map
			this.map = new google.maps.Map(document.getElementById('map')!, {
				center: { lat: 53.391991, lng: -3.178860 },
				zoom: 20,
				mapTypeId: 'satellite',
				tilt: 0
			});

			// Fetch list of catches from firebase
			this.catchesCollection = this.firestore.collection('catches');
			this.catchesCollection.valueChanges({ idField: 'doc_id' }).pipe(first()).subscribe(documents => {
				// Save documents to catches array
				this.catches = documents;
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
												<p>
													Weight: ${this.catches[i].weight}<br>
													Bait: ${this.catches[i].bait}<br>
													Rig: ${this.catches[i].rig}
												</p>
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
				// Add click location to marker form
				this.clickLocation = JSON.stringify(mapsMouseEvent.latLng.toJSON());
				const element = document.getElementById('add-catch-modal') as HTMLElement;
				const myModal = new Modal(element);
				myModal.show();
			});
		});
	}

	addCatch() {
		console.log('here');
	}
}