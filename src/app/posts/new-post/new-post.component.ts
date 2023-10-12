import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { CategoryService } from 'src/app/Service/category.service';
import { PostService } from 'src/app/Service/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permaLink: string;
  imgSrc: any = './assets/3688477_image_placeholder_scene_gallery_hills_icon.png';
  selectedImg: any;
  categoryArray: Array<any> = [];
  postForm: FormGroup;
  data :any ;
  formStatus: string = 'Add New';
  docId: string;


  constructor(private categoryService: CategoryService,
    private fb: FormBuilder,
    private postService: PostService,
    private router: ActivatedRoute
    ) {

      this.router.queryParams.subscribe(val => {
        this.docId = val['id'];

        if(this.docId){
          this.postService.onloadData(val['id']).subscribe(data => {
            this.data = data;
            this.postForm = this.fb.group({
              title: [this.data.title, [Validators.required, Validators.minLength(10)]],
              permalink: [this.data.permalink, Validators.required],
              excerpt: [this.data.excerpt, [Validators.required, Validators.minLength(30)]],
              category: [`${this.data.category.categoryId}-${this.data.category.category}`, Validators.required],
              postImg: ['', Validators.required],
              content: [this.data.content, Validators.required],
            });
            this.imgSrc = this.data.postImgUrl;
            this.formStatus = 'Edit'
          });
          console.log(val['id']);
        }
        else {
          this.postForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(10)]],
            permalink: ['', Validators.required],
            excerpt: ['', [Validators.required, Validators.minLength(30)]],
            category: ['', Validators.required],
            postImg: ['', Validators.required],
            content: ['', Validators.required],
          });
        }

      });




  }
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(data => {
      this.categoryArray = data
    })
  }

  get fc() {
    return this.postForm.controls
  }




  ontitleChange(x) {
    let value = x.target.value
    this.permaLink = value.replace(/\s/g, '-');
  }

  showPreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result
    }

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    let postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgUrl: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: '',
      createdAt: new Date(),
    }

    console.log(postData);
    this.postService.uploadImg(this.selectedImg, postData,this.formStatus,this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/3688477_image_placeholder_scene_gallery_hills_icon.png'

  }

}
