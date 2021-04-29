import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    // username: ['', Validators.required],
    passwords: this.formBuilder.group({
      pass: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,24}')]],
      reenter: ['', Validators.required],
    }),
    phone: ['', Validators.pattern('[0-9]*')],
    email: ['', [Validators.required, Validators.email]],
    age: [0, Validators.min(13)],
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
  ) { }

  onSubmit(): void {
    console.warn(this.signupForm.value);
    this.signupForm.reset();
  }

  ngOnInit(): void {
  }

}
