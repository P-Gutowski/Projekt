
import { Movie } from './Movie.model';
export interface Tag {
  id: number;
  content: string;
  movie: Movie[];
  createdAt: Date;
  modifiedAt: Date;
}

