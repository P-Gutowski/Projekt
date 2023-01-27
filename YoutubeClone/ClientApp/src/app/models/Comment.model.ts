import { ApplicationUser } from "./ApplicationUser.model";
import { Movie } from './Movie.model';
namespace YoutubeClone.ClientApp.src.app.models
{
  export interface Comment {
    id: number;
    owner: ApplicationUser;
    movie: Movie;
    content: Text;
  }
}

