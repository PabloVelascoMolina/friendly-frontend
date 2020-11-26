import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../_services/posts.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  PostLoading: boolean;
  Post: any[] = [];

  constructor(private _postService: PostsService) { }

  ngOnInit(): void {
     this.GetPosts();
  }

  GetPosts() {
    this.PostLoading = true;
    this._postService.getAllPosts().subscribe((posts: any) => {
      this.Post = posts.data;
      this.PostLoading = false;
    });
  }

}
