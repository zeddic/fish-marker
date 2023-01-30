import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  BehaviorSubject,
  finalize,
  first,
  firstValueFrom,
  Observable,
} from 'rxjs';
import { Catch } from './catch.model';

@Injectable({
  providedIn: 'root',
})
export class CatchesService {
  // userCatches = new BehaviorSubject<Catch[] | null>(null);

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Retrieve a list of catches for
  watchUserCatches(userId: string): Observable<Catch[]> {
    return this.firestore
      .collection<Catch>('catches', (ref) => ref.where('uid', '==', userId))
      .valueChanges({ idField: 'doc_id' })
      .pipe(first());
  }

  getUserCatches(userId: string): Promise<Catch[]> {
    return firstValueFrom(this.watchUserCatches(userId));
  }

  addCatch(formValues: Catch, file: any) {
    return this.firestore
      .collection('catches')
      .add(formValues)
      .then((response) => {
        formValues.id = response.id;
        // Upload file if attached
        if (file !== null) {
          let url_response = this.uploadCatchPhoto(file, formValues.id);
          console.log(url_response);
        }
        // let newCatchList = this.userCatches.getValue();
        // if (newCatchList !== null) {
        // 	newCatchList.push(formValues);
        // } else {
        // 	newCatchList = [formValues];
        // }
        // this.userCatches.next(newCatchList);
      });
  }

  uploadCatchPhoto(file: any, document_id: string) {
    const filePath = 'catch-images/' + document_id;
    const fileRef = this.storage.ref(filePath);
    return this.storage
      .upload(filePath, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef
            .getDownloadURL()
            .pipe(first())
            .subscribe((response) => {
              this.firestore
                .doc(`catches/${document_id}`)
                .update({ image: response })
                .then(() => {
                  return response;
                });
            });
        })
      )
      .subscribe();
  }

  deleteCatch() {
    // code for removing a document under the catches collection
  }
}
