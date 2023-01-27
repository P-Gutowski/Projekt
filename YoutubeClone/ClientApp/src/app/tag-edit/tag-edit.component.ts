import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../models/Tag.model';
import { TagServiceService } from '../services/tag-service.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
  edit_tag: Tag = {
    id: 0,
    content: '',
    movie: [],
    createdAt: new Date,
    modifiedAt: new Date
  }
  constructor(private route: ActivatedRoute, private tagSerivce: TagServiceService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.tagSerivce.GetTag(id)
          .subscribe({
            next: (response) => {
              this.edit_tag = response;
            }
          })
        }
      }
    })
  }

  EditTagMethod() {
  this.tagSerivce.Edit(this.edit_tag.id, this.edit_tag)
  .subscribe({
    next: (response) => {
      this.router.navigate(['tag-list'])
    }
  })
 }
 DeleteTagMethod(id: number) {
  this.tagSerivce.Delete(id)
  .subscribe({
    next: (response) => {
      this.router.navigate(['tag-list'])
    }
  })
 }

}
