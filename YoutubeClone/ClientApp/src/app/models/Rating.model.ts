import { ApplicationUser } from "./ApplicationUser.model";
import { Movie } from './Movie.model';
export interface Rating {
  id: number,
  owner: ApplicationUser;
  movie: Movie;
  value: number;
}


