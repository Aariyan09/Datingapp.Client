import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode:boolean = false;
  users:any;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  registerToogle(){
    this.registerMode = true;
  }

  fetchUsers(){
    this.http.get('https://localhost:7126/api/users').subscribe({
      next:result =>{this.users = result;},
      error:error => {console.log(error)},
      complete: () => {console.log('Completed')}
    });
  }


  cancelRegisterMode(flag:boolean){
    this.registerMode = flag
  }
}
