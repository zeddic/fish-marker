import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-catch-item',
	templateUrl: './catch-item.component.html',
	styleUrls: ['./catch-item.component.css']
})
export class CatchItemComponent implements OnInit {
	@Input() catch: any;
	constructor() { }

	ngOnInit(): void {

	}
}
