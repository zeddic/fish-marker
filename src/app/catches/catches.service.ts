import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CatchesService {

	constructor(private firestore: AngularFirestore) { }

	watchUserCatches(userId: string) {
		return this.firestore.collection('catches', ref => ref.where('uid', '==', userId)).valueChanges({ idField: 'doc_id' }).pipe(first());
	}

	addCatch(formValues: Catch) {
		return this.firestore.collection('catches').add(formValues);
	}

	deleteCatch() {
		// code for removing a document under the catches collection
	}
}
