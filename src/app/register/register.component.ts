import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  maxDate:Date = new Date();
  validationError:string[] | undefined;

  constructor(
    private accountService: AccountService,
    private toast: ToastrService,
    private fb:FormBuilder,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.intializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  intializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      userName: ['', [Validators.required]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:['', [Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next : () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  register() {
    if(this.registerForm.valid){
      const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
      const values = {...this.registerForm.value,dateOfBirth:dob};
      this.accountService.register(values).subscribe({
        next: response => {
          this.router.navigateByUrl('/members');
        },
        error: error => {
          this.validationError = error;
        }
      })
    }
    else{
      this.markFormGroupTouched(this.registerForm);
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(date:string | undefined){
    if(!date)return
    let inputDate = new Date(date);
    return new Date(inputDate.setMinutes(inputDate.getMinutes() - inputDate.getTimezoneOffset())).toISOString().slice(0,10);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    })
  }
}
