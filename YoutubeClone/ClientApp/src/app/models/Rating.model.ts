import { ApplicationUser } from "./ApplicationUser.model";
import { Movie } from './Movie.model';
export interface Rating {
  id: number,
  ownerid: number;
  movieid: number;
  value: number;
}


