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
		let loader = new Loader({
			apiKey: 'AIzaSyAFmtZ0FFDLTPmSlySZU2e5EA4NwdOt0Cg'
		});

		loader.load().then(() => {
			let map = new google.maps.Map(document.getElementById('map')!, {
				center: { lat: 53.391991, lng: -3.178860 },
				zoom: 20,
				mapTypeId: 'satellite',
				tilt: 0
			});

			new google.maps.Marker({
				position: { lat: 53.410647, lng: -3.125611 },
				map: map
			});

			new google.maps.Marker({
				position: { lat: 53.39, lng: -3.178860 },
				map: map
			});
		});
	}
}
