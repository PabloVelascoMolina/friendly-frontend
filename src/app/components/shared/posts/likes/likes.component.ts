import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../../../_services/posts.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  @Input() postId: number;
  Liked: number;
  Count: number;

  constructor(private _postService: PostsService) { }

  ngOnInit(): void {
    this.checkLike();
    this.checkCountLikes();
  }

  pushLike() {
    this._postService.getAddLike(this.postId).subscribe((like: any) => {
      if (like.data === null) {
        this.deleteLike();
        this.Liked = 0;
        this.Count -= 1;
      } else {
        this.Liked = 1;
        this.Count += 1;
      }
    });
  }

  checkLike() {
    this._postService.getCheckLike(this.postId).subscribe((like: any) => {
        if (like.data !== null) {
          this.Liked = 1;
        }
    });
  }

  checkCountLikes() {
    this._postService.getCountLikes(this.postId).subscribe((like: any) => {
      this.Count = like.data.likes;
    });
  }

  deleteLike() {
    this._postService.getDeleteLike(this.postId).subscribe();
  }


}
