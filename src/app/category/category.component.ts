import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private afs: AngularFirestore) { }


  submittForm(formData) {
    let categoryData = {
      category: formData.value.category,
    }
    let subCategoryData = {
      subCategory: 'subCategory1'
    }

    this.afs.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef)
      // this.afs.doc(`categories${docRef.id}`).collection('subcategories').add(subCategoryData).then()
      this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(
        docRef1 => {
          console.log(docRef1);
          // this.afs.doc(`categories/${docRef.id}/subcategories${docRef1.id}`).collection('subcsubcategories').add(subCategoryData).then(() => {
          //   console.log('second level');
            
          // });
          
          
          this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subcsubcategories').add(subCategoryData).then(docRef2 => {
            console.log('second level');
          })

        }) //console.log 
        .catch(err => { console.log(err) });
    })

  }
}
