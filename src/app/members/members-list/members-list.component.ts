import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userparams';
import { User } from 'src/app/_models/users';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  member:member[] = [];
  pagination:Pagination | undefined;
  userParams:UserParams | undefined;
  
  genderList = [{value:'male',display:'Males'},{value:'female',display:'Females'}]

  constructor(private memberService:MembersService){
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  loadMembers(){
    if(this.userParams){
      this.memberService.setUserParams(this.userParams)
      this.memberService.getMembers(this.userParams).subscribe({
        next:response => {        
          if(response.result && response.pagination){
            this.member = response.result;
            this.member.forEach(p => {
              if(!p.photoUrl) p.photoUrl = "https://cdn-icons-png.flaticon.com/512/219/219970.png"
            })
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

  pageChanged(event:any){
    if(this.userParams && this.userParams?.pageNumber !== event.pageNumber){
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams)
      this.loadMembers();
    }
    
  }
}
