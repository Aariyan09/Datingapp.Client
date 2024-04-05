import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/users';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModelComponent } from 'src/app/modals/roles-model/roles-model.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users:User[] = [];
  bsModalRef:BsModalRef<RolesModelComponent> = new BsModalRef<RolesModelComponent>();

  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ]

  constructor(private adminService:AdminService,private modalService:BsModalService){}

  ngOnInit(): void {
    this.getUserWithRoles()
  }

  getUserWithRoles(){
    this.adminService.getUsersWithRoles().subscribe({
      next: users =>{
        if(users){
          console.log(users)
          this.users = users;
        }
      }
    });
  }

  openRolesModal(user:User){
    const config = {
      class:'modal-dialog-centered',
      initialState:{
        username:user.userName,
        availableRoles:this.availableRoles,
        selectedRoles:[...user.roles]
      }
    }
    this.bsModalRef = this.modalService.show(RolesModelComponent,config);
    this.bsModalRef.onHide?.subscribe({
      next:() => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if(!this.arrayEqual(selectedRoles!,user.roles)){
          this.adminService.updateUserRole(user.userName,selectedRoles?.toString()!).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  private arrayEqual(arr1:any[],arr2:any[]){
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
  }
}
