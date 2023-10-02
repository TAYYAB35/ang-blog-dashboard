import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
postArray: Array<any>;
  constructor(private postService: PostService) { }

  ngOnInit() { 
    this.postService.loadData().subscribe(data => {
      this.postArray = data;
    });

  }

  onDelete(postImgPath: any ,id: any){
    this.postService.deleteImg(postImgPath,id);
  }

  onFeatured(id ,value){
    const featuredData = {
      isFeatured : value
    }


    this.postService.markedFeatured(id,featuredData)
  }

}
