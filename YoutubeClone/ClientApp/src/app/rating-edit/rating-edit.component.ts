import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from '../models/Rating.model';
import { RatingAdd } from '../models/RatingAdd.model';
import { RatingEdit } from '../models/RatingEdit.model';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating-edit',
  templateUrl: './rating-edit.component.html',
  styleUrls: ['./rating-edit.component.css']
})
export class RatingEditComponent implements OnInit {

  edit_rating: RatingEdit = {
    id: 0,
    value: 0
  }
  constructor(private route: ActivatedRoute, private ratingServicee: RatingService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id  = params.get('id');
        if (id) {
          this.ratingServicee.GetRating(id)
          .subscribe({
            next: (response) => {
              this.edit_rating = response;
            }
          })
        }
      }
    })
  }

  EditRatingMethod() {
  this.ratingServicee.Edit(this.edit_rating.id, this.edit_rating.value)
  .subscribe({
    next: (response) => {
      this.router.navigate(['rating-list'])
    }
  })
 }
 DeleteRatingMethod(id: number) {
  this.ratingServicee.Delete(id)
  .subscribe({
    next: (response) => {
      this.router.navigate(['rating-list'])
    }
  })
 }

}
