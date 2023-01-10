import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	host: { 'class': 'flex-grow-1' }
})
export class MapComponent implements OnInit {

	ngOnInit() {
		// Creater loader for map
		let loader = new Loader({
			apiKey: 'AIzaSyAFmtZ0FFDLTPmSlySZU2e5EA4NwdOt0Cg'
		});

		// Initialise Map and Markers
		loader.load().then(() => {
			// Initialise Map
			let map = new google.maps.Map(document.getElementById('map')!, {
				center: { lat: 53.391991, lng: -3.178860 },
				zoom: 20,
				mapTypeId: 'satellite',
				tilt: 0
			});

			const contentString =
				`<div id="content">
					<h1 id="firstHeading" class="firstHeading">Common Carp</h1>
					<img src="assets/fish_example.jpg" class="card-img-top" alt="...">
					<div id="bodyContent">
						<p>
							Weight: 16lb 5oz<br>
							Bait: Pacific Tuna 15mm Boilie<br>
							Rig: Spinner Rig
						</p>
					</div>
				</div>`;

			// Initialise Marker
			let marker = new google.maps.Marker({
				position: { lat: 53.410647, lng: -3.125611 },
				map: map,
				draggable: true,
				label: 'A'
			});

			// Info window for marker and click event
			const infowindow = new google.maps.InfoWindow({
				content: contentString,
				ariaLabel: "Uluru",
			});

			marker.addListener("click", () => {
				infowindow.open({
					anchor: marker,
					map,
				});
			});

			// Example of second marker
			new google.maps.Marker({
				position: { lat: 53.39, lng: -3.178860 },
				map: map,
				draggable: true,
				label: 'B'
			});
		});
	}
}
