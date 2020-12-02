import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PostsService } from '../../../_services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  PostLoading: boolean;
  ErrorDisplay: boolean;
  Post: any[] = [];
  @Input() id: number;

  ErrorDisplayText: string;

  constructor(private _postService: PostsService) { }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.GetPostsById(this.id);
    } else {
      this.GetPosts();
    }

  }


  GetPosts() {
    this.PostLoading = true;
    this._postService.getAllPosts().subscribe((posts: any) => {
      this.Post = posts.data;
      this.PostLoading = false;
    });
  }

  GetPostsById(id: number) {
    this.PostLoading = true;
    this._postService.getAllPostsById(id).subscribe((posts: any) => {
      if (posts.error) {
        this.PostLoading = false;
        this.ErrorDisplay = true;
        return this.ErrorDisplayText = posts.error;
      }
      this.Post = posts;
      this.PostLoading = false;
    });
  }

}
