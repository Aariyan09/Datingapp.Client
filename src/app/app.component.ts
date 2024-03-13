import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users:any;
  title = 'Datingapp.Client';

  constructor(private accountService:AccountService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser(){
    const userdata = localStorage.getItem('user');
    if(userdata){
      const user:User = JSON.parse(userdata);
      this.accountService.setCurrentUser(user); 
    }

  }
}
