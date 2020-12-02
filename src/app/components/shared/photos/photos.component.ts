import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../../_services/posts.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  @Input() id: number;
  Photos: any[] = [];

  constructor(private _postsService: PostsService) { }

  ngOnInit(): void {
    this.GetPhotos(this.id);
  }

  GetPhotos( id: number ) {
    this._postsService.getPhotosProfile(id).subscribe((photos: any) => {
      this.Photos = photos.data;
    });
  }

}
