import { Component, OnInit } from '@angular/core';
import { member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  member:member[] = [];

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.memberService.getMembers().subscribe({
      next:(response) => {
        this.member = response
      },
      error: err => console.log(err)
    })
  }


}
