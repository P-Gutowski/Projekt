
import { Tag } from './Tag.model';
import { ApplicationUser } from './ApplicationUser.model';
import { Rating } from './Rating.model'
export interface Movie {
  id: number;
  owner: ApplicationUser;
  tags: Tag[];
  sourceFileName: string;
  createdAt: Date;
  modifiedAt: Date;
  ratings: Rating[];
}