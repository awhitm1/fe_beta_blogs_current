import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../shared/models/blog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${environment.apiUrl}/blogs`);
  }

  createBlog(blog: FormData): Observable<Blog> {
    return this.http.post<Blog>(`${environment.apiUrl}/blogs`, blog);
  }

  likeBlog(blogId: number): Observable<Blog> {
    return this.http.post<Blog>(`${environment.apiUrl}/blogs/${blogId}/like`, {});
  }

  unLikeBlog(blogId: number): Observable<Blog> {
    return this.http.delete<Blog>(`${environment.apiUrl}/blogs/${blogId}/unlike`, {});
  }
}
