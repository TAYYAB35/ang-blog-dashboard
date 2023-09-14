import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private storage :AngularFireStorage,
    private afs:AngularFirestore,
    private toastr :ToastrService,
    private router:Router
    ) { }


  uploadImg(selectedImg, postData,formStatus ,id) {
    // Generate a unique file path for the image using the current timestamp
    const filePath = `postIMG/${Date.now()}`;

    // Upload the selected image to Firebase Storage
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log("Upload successful");

      // Get the download URL of the uploaded image
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgUrl = URL;

        if(formStatus === "Edit"){
          this.updateData(id , postData);
        }else {
          this.saveData(postData);
        }


      })
    })
  }

  saveData(data){
    this.afs.collection("posts").add(data).then(data => {
      this.toastr.success("data added successfully ..!");
      this.router.navigate(['/posts']);
    });
  }

  loadData() {
    // Use the map operator to transform the data and return the observable
    return this.afs.collection('posts').snapshotChanges().pipe(
      // snapshotChanges()  in order to load list of compoenets and can fetch the document with doucment id
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data(); //document
          const id = a.payload.doc.id; // doucment id
          return { data, id };
        });
      })
      );
    }
    
    onloadData(id){
      return  this.afs.doc(`posts/${id}`).valueChanges();
      // snapshotChanges()  in order to load one compoenets and will not fetch id but only the data ,, we alreday now the id so we are using this value change method
  }



  updateData(id ,data){
    this.afs.doc(`posts/${id}`).update(data).then(val => {
      this.toastr.success('Data Updated Successfully' );
      this.router.navigate(['/posts']);
    })
  }

}

