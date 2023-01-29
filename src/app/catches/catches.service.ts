import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, first } from 'rxjs';
import { Catch } from './catch.model';
import { CatchesComponent } from './catches.component';

@Injectable({
	providedIn: 'root'
})
export class CatchesService {
	userCatches = new BehaviorSubject<Catch[] | null>(null);

	constructor(private firestore: AngularFirestore) { }

	// Retrieve a list of catches for 
	fetchUserCatches(userId: string) {
		this.firestore.collection<Catch>('catches', ref => ref.where('uid', '==', userId)).valueChanges({ idField: 'doc_id' }).pipe(first()).subscribe((catches: Catch[]) => this.userCatches.next(catches));
	}

	addCatch(formValues: Catch) {
		return this.firestore.collection('catches').add(formValues).then((response) => {
			formValues.id = response.id;
			let newCatchList = this.userCatches.getValue();
			if (newCatchList !== null) {
				newCatchList.push(formValues);
			} else {
				newCatchList = [formValues];
			}
			this.userCatches.next(newCatchList);
		});
	}

	deleteCatch() {
		// code for removing a document under the catches collection
	}
}
