import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  bustRequestCounter = 0;
  constructor(private spinner:NgxSpinnerService) { }

  busy(){
    this.bustRequestCounter++;
    this.spinner.show(undefined,{
      type:'line-scale-party',
      bdColor:'rgba(255,255,255,0)',
      color:'#333333'
    })
  }

  idle(){
    this.bustRequestCounter--;
    if(this.bustRequestCounter <= 0){
      this.bustRequestCounter = 0;
      this.spinner.hide();
    }
  }

}
