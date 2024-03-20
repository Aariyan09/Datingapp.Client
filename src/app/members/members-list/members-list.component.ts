import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  member$:Observable<member[]> | undefined;

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.member$ = this.memberService.getMembers();
  }


}
