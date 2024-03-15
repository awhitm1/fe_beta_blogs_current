import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  @Input({required: true}) blogs: Blog[] = []
  @Output() onChangeBlogs: EventEmitter<Blog[]> = new EventEmitter<Blog[]>();

  constructor(private blogService: BlogService) {}
  toggleLiked(blogId: number) {
    const blogs = [...this.blogs];
    const blogIndex = blogs.findIndex((blog) => blog.id === blogId);

    if (blogIndex === -1) return;

    const blog = blogs[blogIndex];
    const isLiked = blog.liked;
    const blog$ = isLiked
      ? this.blogService.unLikeBlog(blogId)
      : this.blogService.likeBlog(blogId);

    blog.liked = !isLiked;

    blog$.subscribe({
      next: () => {
        blog.likes_count! += isLiked ? -1 : 1;
        this.onChangeBlogs.emit(blogs);
      },
      error: (error) => {
        console.error('Error toggling like status:', error);
        blog.liked = isLiked;
      },
    });
  }

}
