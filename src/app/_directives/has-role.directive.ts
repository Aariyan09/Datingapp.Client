import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/users';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]' //*appHasRole='['Admin']'
})
export class HasRoleDirective implements OnInit {

  @Input() appHasRole:String[] = [];
  user:User = {} as User;

  constructor(private viewContainer:ViewContainerRef,private templateRef:TemplateRef<any>,private accountService:AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user => {
        if(user){
          this.user = user;
        }
      }
    })
  }


  ngOnInit(): void {
    if(this.user.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainer.clear();
    }
  }

}
