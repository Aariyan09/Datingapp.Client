import { Component, Input } from '@angular/core';
import { member } from 'src/app/_models/member';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.css']
})
export class MembersCardComponent {
  @Input() member:member | undefined;
}
