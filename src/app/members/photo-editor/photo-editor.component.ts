import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { member } from 'src/app/_models/member';
import { User } from 'src/app/_models/users';
import { Photo } from 'src/app/_models/Photo';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment.development';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member:member|undefined;

  uploader:FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseurl = environment.apiUrl;
  user:User | undefined;

  constructor(private accountService:AccountService,private memberServ :MembersService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user => {
        if(user){
          this.user = user;
        }
      }
    })
  }
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo:Photo){
    this.memberServ.setMainPhoto(photo.id.toString()).subscribe({
      next: _ => {
        if(this.user && this.member){
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(x => {
            if(x.isMain) x.isMain = false;
            if(x.id == photo.id) x.isMain = true;
          })
        }
      }
    })
  }

  deletePhoto(photo:Photo){
    this.memberServ.deletePhoto(photo.id.toString()).subscribe({
      next: _ => {
        if(this.member){
          this.member.photos = this.member.photos.filter(x => x.id != photo.id);
        }
      }
    })
  }


  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseurl + 'users/add-photo',
      authToken:'Bearer '+this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item,response,status,header) => {
      if(response && this.member){
        const photo = JSON.parse(response);
        

        this.member?.photos.push(photo);
        if(photo.isMain) this.member.photoUrl = photo.url;
      }
    }
   
  }
}

