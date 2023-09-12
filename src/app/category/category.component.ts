import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Service/category.service';
import { CategoryInterface } from '../models/category-interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor( private categoryService: CategoryService ) { }
  categoryArrays: Array<any> = [];
  formcategory : string ;
  formStatus : string  = 'Add';
  editIndex : number ;

  ngOnInit() :void {
    this.categoryService.loadData().subscribe(val => {
      this.categoryArrays = val;
      console.log(this.categoryArrays); 
    });
  }

  submittForm(formData) {
    console.log(formData);
    let categoryData:CategoryInterface = {
      category: formData.value.category,
    }

    if(this.formStatus === 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }else if(this.formStatus === 'Edit'){
      debugger
      console.log(this.editIndex)
      this.categoryService.updateData( this.editIndex , categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
    // let subCategoryData = {
    //   subCategory: 'subCategory1'
    // }

    // this.afs.collection('categories').add(categoryData).then(docRef => {
    //   console.log(docRef)
    //   // this.afs.doc(`categories${docRef.id}`).collection('subcategories').add(subCategoryData).then()
    //   this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(
    //     docRef1 => {
    //       console.log(docRef1);
    //       // this.afs.doc(`categories/${docRef.id}/subcategories${docRef1.id}`).collection('subcsubcategories').add(subCategoryData).then(() => {
    //       //   console.log('second level');
            
    //       // });
          
          
    //       this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subcsubcategories').add(subCategoryData).then(docRef2 => {
    //         console.log('second level');
    //       })

    //     }) //console.log 
    //     .catch(err => { console.log(err) });
    // })

  }
  editCategory(category , id){
    this.formcategory = category;
    this.formStatus = 'Edit'
    this.editIndex = id
    console.log(category ,id);
    debugger
  }

  onDelete(id){
    this.categoryService.deleteData(id)
  }
}
