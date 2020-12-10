import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PostsService } from '../../../_services/posts.service';
import { Post } from '../../../_models/post';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public Post: Observable<any>;

  PostLoading: boolean;
  ErrorDisplay: boolean;
  User: any[] = [];
  UserInfo: any = {};
  CheckLiked: any[] = [];
  @Input() id: number;

  ErrorDisplayText: string;

  types = [
    {
      "id": "1",
      "value": "Información",
      "icon": "info-circle"
    },
    {
      "id": "2",
      "value": "Reportar",
      "icon": "flag"
    },
    {
      "id": "3",
      "value": "Eliminar",
      "icon": "trash"
    }];

  constructor(private _postService: PostsService, private authService: AuthenticationService) {
    this.UserInfo = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.GetPostsById(this.id);
    } else {
      this.GetPosts();
    }

  }

  ngOnChanges() {
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
      this.Post = posts.data;
      this.PostLoading = false;
    });
  }

  ConvertToJSON(product: any) {
    return JSON.parse(product);
  }
}
