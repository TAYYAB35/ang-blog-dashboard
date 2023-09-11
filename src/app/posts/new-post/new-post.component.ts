import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permaLink : string ;
  imgSrc : any = './assets/3688477_image_placeholder_scene_gallery_hills_icon.png';
  selectedImg : any ;
  disabled: boolean = true;
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


}
