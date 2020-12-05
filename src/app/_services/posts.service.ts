import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post } from '../_models/post';

@Injectable({ providedIn: 'root' })

export class PostsService {

	constructor(private http: HttpClient) { }

	getAllPosts() {
		return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
	}

	getAllPostsById(id: number) {
		return this.http.get<Post[]>(`${environment.apiUrl}/posts-by/${id}`);
	}

	getPhotosProfile(id: number) {
		return this.http.get<any>(`${environment.apiUrl}/photos/${id}`);
	}

  getAddedPost(description: string, category: string, image: string, user_id: number) {
    return this.http.post<any>(`${environment.apiUrl}/posts`, { description, category, image, user_id })
      .pipe(map(post => {
          return post;
      }));
  }
}
