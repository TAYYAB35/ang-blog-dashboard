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


  uploadImg(selectedImg, postData) {
    // Generate a unique file path for the image using the current timestamp
    const filePath = `postIMG/${Date.now()}`;

    // Upload the selected image to Firebase Storage
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log("Upload successful");

      // Get the download URL of the uploaded image
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgUrl = URL;
        this.saveData(postData);
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
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { data, id };
        });
      })
    );
  }


}

