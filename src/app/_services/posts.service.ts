import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Post } from '../_models/post';

@Injectable({ providedIn: 'root' })

export class PostsService {

	constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
		return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
	}

	getAllPostsById(id: number) {
		return this.http.get<Post[]>(`${environment.apiUrl}/posts-by/${id}`);
	}

	getPhotosProfile(id: number) {
		return this.http.get<any>(`${environment.apiUrl}/photos/${id}`);
	}

  getAddedPost(description: string, category: string, image: string, user_id: number, headers: any) {
    return this.http.post<any>(`${environment.apiUrl}/posts`, { description, category, image, user_id }, { headers })
      .pipe(map(post => {
          return post;
      }));
  }

  getCheckLike(id: number) {
    return this.http.post<any>(`${environment.apiUrl}/post-like-view/${id}`, { id })
      .pipe(map(post => {
        return post;
      }));
  }

  getAddLike(id: number) {
    return this.http.post<any>(`${environment.apiUrl}/post-like-add/${id}`, { id })
      .pipe(map(post => {
        return post;
      }));
  }

  getCountLikes( id: number ) {
    return this.http.post<any>(`${environment.apiUrl}/post-like-count/${id}`, { id })
      .pipe(map(post => {
        return post;
      }));
  }

  getDeleteLike(id: number) {
    return this.http.post<any>(`${environment.apiUrl}/post-like-remove/${id}`, { id })
      .pipe(map(post => {
        return post;
      }));
  }

  getDeletePost(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/posts/${id}`)
      .pipe(map(remove => {
        return remove;
      }));
  }
}
