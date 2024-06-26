import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailsComponent } from './members/members-details/members-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessageComponent } from './message/message.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventSavedChangesGuard } from './_guards/prevent-saved-changes.guard';
import { memberdetailResolverResolver } from './_resolver/memberdetail-resolver.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './_guards/admin.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'',
   runGuardsAndResolvers:'always',
   canActivate:[authGuard],
   children:[
    {path:'members',component:MembersListComponent,canActivate:[authGuard]},
    {path:'members/:username',component:MembersDetailsComponent,resolve:{member:memberdetailResolverResolver}},
    {path:'member/edit',component:MemberEditComponent,canDeactivate:[preventSavedChangesGuard]},
    {path:'lists',component:ListsComponent},
    {path:'message',component:MessageComponent},
    {path:'admin',component:AdminPanelComponent,canActivate:[adminGuard]},
   ]
  },
  {path:'error',component:TestErrorComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'**',component:HomeComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
