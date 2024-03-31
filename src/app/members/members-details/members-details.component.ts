import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['./members-details.component.css'],
  standalone:true,
  imports:[CommonModule,TabsModule,GalleryModule,TimeagoModule]
})
export class MembersDetailsComponent implements OnInit {
  member:member|undefined;
  images:GalleryItem[] = [];

  constructor(private memberService:MembersService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.loadMember();
  }


  loadMember(){
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next:member =>{
        this.member = member;
        this.getImages();
      }
    });
  }

  getImages(){
    if(!this.member)return;
    for (let image of this.member?.photos) {
      this.images.push(new ImageItem({src:image.url,thumb:image.url}))
    }
  }

}
