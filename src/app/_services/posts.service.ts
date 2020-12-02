import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Post } from '../_models/post';

@Injectable({ providedIn: 'root' })

export class PostsService {

	constructor(private http: HttpClient) { }

	getAllPosts() {
		return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
	}

	getAllPostsById(id: number) {
		return this.http.get<Post[]>(`${environment.apiUrl}/posts/${id}`);
	}

	getPhotosProfile(id: number) {
		return this.http.get<any>(`${environment.apiUrl}/photos/${id}`);
	}
}
