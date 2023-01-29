import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	userForm = new FormGroup({
		'email': new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
		'password': new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		'name': new FormControl('', { nonNullable: true, validators: [Validators.required] })
	});

	constructor(private userService: UserService) { }

	ngOnInit(): void { }

	registerUser() {
		if (this.userForm.valid) {
			const email = this.userForm.get('email')!.value;
			const password = this.userForm.get('password')!.value;
			const name = this.userForm.get('name')!.value;
			this.userService.createUser(email, password, name);
		}
	}
}
