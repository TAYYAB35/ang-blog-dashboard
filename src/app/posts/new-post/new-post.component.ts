import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Service/category.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permaLink : string ;
  imgSrc : any = './assets/3688477_image_placeholder_scene_gallery_hills_icon.png';
  selectedImg : any ;
  categoryArray : Array<any> = [];
  postForm : FormGroup;
  constructor(private categoryService:CategoryService,private fb: FormBuilder){
    this.postForm = this.fb.group({
      title : ['',[Validators.required, Validators.minLength(10)]],
      permalink : ['',Validators.required ] ,
      excerpt : ['',[Validators.required, Validators.minLength(30)]],
      category : ['',Validators.required],
      postImg : ['',Validators.required], 
      content : ['',Validators.required],
    });

  }
  ngOnInit() : void{
    this.categoryService.loadData().subscribe(data =>{
      this.categoryArray = data
    })
  }

    get fc (){
      return this.postForm.controls
    }

    


  ontitleChange(x) {
    let value = x.target.value
    this.permaLink = value.replace(/\s/g, '-');
  }

  showPreview($event){
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.imgSrc = e.target.result
    }

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit(){
    let splitted = this.postForm.value.category.split('-');

    let postData : Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category : {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgUrl : '',
      excerpt : this.postForm.value.excerpt,
      content : this.postForm.value.content,
      isFeatured : true,
      views : 0,
      status : '',
      createdAt : new Date(),
    }

    console.log(postData)

  }

}
