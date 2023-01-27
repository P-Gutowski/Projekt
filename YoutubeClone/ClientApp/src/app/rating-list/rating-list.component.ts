import { Component, OnInit } from '@angular/core';
import { Rating } from '../models/Rating.model';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {

  constructor(private ratingService: RatingService) { }
  Ratings: Rating[] = [];
  ngOnInit(): void {
    this.ratingService.Index()
    .subscribe({
      next: (Ratings) => {
        console.log(Ratings)
        this.Ratings = Ratings;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}