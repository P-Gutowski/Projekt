import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from '../models/Tag.model';
import { TagAdd } from '../models/TagAdd.model';
import { TagServiceService } from '../services/tag-service.service';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.css']
})
export class TagAddComponent implements OnInit {
  addtag: TagAdd = {
    Content: ''
  }
  constructor(private tagaddservice: TagServiceService, private router: Router) { }
  
  ngOnInit(): void {
  }
  tagaddmethod(){
     this.tagaddservice.Create(this.addtag)
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