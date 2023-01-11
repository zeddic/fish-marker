import { Component } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	faCog = faCog;

}
