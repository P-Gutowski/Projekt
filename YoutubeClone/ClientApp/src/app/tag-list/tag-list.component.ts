import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/Tag.model';
import { TagServiceService } from '../services/tag-service.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  constructor(private movieService: TagServiceService) { }
  Tags: Tag[] = [];
  ngOnInit(): void {
    this.movieService.Index()
    .subscribe({
      next: (Tags) => {
        console.log(Tags)
        this.Tags = Tags;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}