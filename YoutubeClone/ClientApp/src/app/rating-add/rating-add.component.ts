import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingAdd } from '../models/RatingAdd.model';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating-add',
  templateUrl: './rating-add.component.html',
  styleUrls: ['./rating-add.component.css']
})
export class RatingAddComponent implements OnInit {

  addrating: RatingAdd = {
    value: 0
  }
  constructor(private ratingAddService: RatingService, private router: Router) { }
  
  ngOnInit(): void {
  }
  ratingAddMethod(){
     this.ratingAddService.Create(this.addrating)
     .subscribe({
        next: (tag) => {
          console.log(tag)
        },
        error: (respone) => {
          console.log(respone)
        }
     });
  }

}
