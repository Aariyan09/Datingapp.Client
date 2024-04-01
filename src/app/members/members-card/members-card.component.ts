import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.css']
})
export class MembersCardComponent {
  @Input() member:member | undefined;

  constructor(private memberService:MembersService,private toast:ToastrService){}

  addLike(member:member){
    this.memberService.addLike(member.userName).subscribe({
      next:() => {
        this.toast.success('You have liked'+this.member?.knownAs)
      }
    });
  }
}
