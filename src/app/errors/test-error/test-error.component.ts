import { HttpClient } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl:string = 'https://localhost:7126/api/';
  validationError:string[]=[];

  constructor(private http:HttpClient){}

  get404Error(){
    this.http.get(this.baseUrl+'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }


  get400Error(){
    this.http.get(this.baseUrl+'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUrl+'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error(){
    this.http.get(this.baseUrl+'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400ValidationError(){
    this.http.post(this.baseUrl+'Account/Register',{}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error)
        this.validationError = error
      }
    })
  }
}
