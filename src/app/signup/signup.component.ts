import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hidePass = true;
  hideReenter = true;
  maxDate: Date;

  signupForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    passwords: this.formBuilder.group({
      pass: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,24}')]],
      reenter: ['', Validators.required],
    }, {validators: this.mustMatch('pass', 'reenter')}),
    phone: ['', Validators.pattern('[0-9]*')],
    email: ['', [Validators.required, Validators.email]],
    dob: ['',[Validators.required]],
    sex: [''],
    address: this.formBuilder.group({
      house: ['', Validators.required],
      area: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private backconnService: BackconnService,
    private router: Router,
  ) { }

  mustMatch(pass: string, reenter: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[pass];
      const matchingControl = formGroup.controls[reenter];
      if(matchingControl.errors && !matchingControl.errors.mustMatch)
        return null;
      if(control.value !== matchingControl.value)
        matchingControl.setErrors({mustMatch: true});
    }
  }

  onSubmit(): void {
    const formJson = JSON.stringify(this.signupForm.value);
    console.log(formJson);
    this.backconnService.signup(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.signupForm.reset();
        this.router.navigate(['/login']);
      }
      else {
        alert("error");
      }
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    const today = new Date();
    this.maxDate.setFullYear(today.getFullYear()-13);
  }

}
