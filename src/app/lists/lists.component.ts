import { Component, OnInit } from '@angular/core';
import { member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  member:member[] | undefined;
  type:string = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination:Pagination | undefined;

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.loadLikes()
  }

  loadLikes(){
    this.memberService.getLikes(this.type,this.pageNumber,this.pageSize).subscribe({
      next:response => {
        this.member = response.result;
        this.pagination = response.pagination
      }
    })
  }

  pageChanged(event:any){
    if(this.pageNumber && this.pageNumber !== event.pageNumber){
      this.pageNumber = event.page;
      this.loadLikes();
    }
    
  }
}
