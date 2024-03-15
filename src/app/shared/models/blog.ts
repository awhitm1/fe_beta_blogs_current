import { User } from './user';

export class Blog {
  id!: number;
  title: string = '';
  content: string = '';
  cover_image_url: string = '';
  liked?: boolean = false;
	likes_count?: number = 0;
  user_id?: number;
  user?: User;
}
