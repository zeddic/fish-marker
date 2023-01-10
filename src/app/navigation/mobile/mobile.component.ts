import { Component } from '@angular/core';
import { faMapLocationDot, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-mobile',
	templateUrl: './mobile.component.html',
	styleUrls: ['./mobile.component.css']
})
export class MobileComponent {
	faMap = faMapLocationDot;
	faNewspaper = faNewspaper;
	faUser = faUser;
}
