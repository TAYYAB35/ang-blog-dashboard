import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore, private toaster: ToastrService) { }

  // Adding Data to firebase
  saveData(data) {
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef)
      this.toaster.error('Data saved successfully ..!', '', {
        timeOut: 2000,
      });
      
    })
      .catch(err => {
        this.toaster.error('Error Occur', '', {
          timeOut: 2000,
        });
      });
  }

  // Getting data from Firebase
  loadData() {
    // Use the map operator to transform the data and return the observable
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { data, id };
        });
      })
    );
  }

  // Updating data in the firebase database
  updateData(id, editData) {
    //  ! with querry path
    // this.afs.doc(`categories${id}`).update(editData).then( )
    //  ! with querry path
    this.afs.collection('categories').doc(id).update(editData).then(
      docRef => {
        this.toaster.warning('Data updated successfully ..!' , '', {
          timeOut: 2000,
        })
      });
  }

  // delete the category
  deleteData(id){
    this.afs.doc(`categories${id}`).delete().then(callBack=>{
      this.toaster.info('Data deleted successfully ..!' , '', {
        timeOut: 2000,
      })
    })
  }

}
