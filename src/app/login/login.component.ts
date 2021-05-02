import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    fullName: ['Amit', Validators.required],
    // username: ['', Validators.required],
    passwords: this.formBuilder.group({
      pass: ['Aa!12345', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,24}')]],
      reenter: ['Aa!12345', Validators.required],
    }, {validators: this.mustMatch('pass', 'reenter')}),
    phone: ['9876543210', Validators.pattern('[0-9]*')],
    email: ['amit@example.com', [Validators.required, Validators.email]],
    age: [19, Validators.min(13)],
    sex: ['m'],
    address: this.formBuilder.group({
      house: ['A11', Validators.required],
      area: ['abc', Validators.required],
      landmark: ['def'],
      city: ['Pune', Validators.required],
      state: ['Maharashtra', Validators.required],
      pin: ['411001', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
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
    const formJson = JSON.stringify(this.loginForm.value);
    console.log(formJson);
    this.backconnService.postNewCustomer(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.loginForm.reset();
        this.router.navigate(['/dash']);
      }
      else {
        alert("error");
      }
    });
  }

  ngOnInit(): void {
  }

}
