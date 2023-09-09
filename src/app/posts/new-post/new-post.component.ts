import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private categoryService:CategoryService){}
  permaLink : string ;
  imgSrc : any = './assets/3688477_image_placeholder_scene_gallery_hills_icon.png';
  selectedImg : any ;
  categoryArray : Array<any> = [];

  ngOnInit() : void{
    this.categoryService.loadData().subscribe(data =>{
      this.categoryArray = data
    })

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
