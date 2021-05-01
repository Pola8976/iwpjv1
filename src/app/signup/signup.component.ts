import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.formBuilder.group({
    fullName: ['Amit', Validators.required],
    // username: ['', Validators.required],
    passwords: this.formBuilder.group({
      pass: ['Aa!12345', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,24}')]],
      reenter: ['Aa!12345', Validators.required],
    }),
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
  ) { }

  onSubmit(): void {
    console.warn(this.signupForm.value);
    const formJson = JSON.stringify(this.signupForm.value);
    console.log(formJson);
    this.backconnService.postNewCustomer(formJson).subscribe(result => {
      console.log(result);
    });
    // this.signupForm.reset();
  }

  ngOnInit(): void {
  }

}
