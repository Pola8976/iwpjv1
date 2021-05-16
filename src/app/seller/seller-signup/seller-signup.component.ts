import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';
import { SnackBarService } from 'src/app/snack-bar.service';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.scss']
})
export class SellerSignupComponent implements OnInit {

  hidePass = true;
  hideReenter = true;
  maxDate: Date;

  // pass: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,24}')]],

  signupForm = this.formBuilder.group({
    ownName: ['', Validators.required],
    passwords: this.formBuilder.group({
      pass: ['', Validators.required],
      reenter: ['', Validators.required],
    }, {validators: this.mustMatch('pass', 'reenter')}),
    phone: ['', Validators.pattern('[0-9]*')],
    email: ['', [Validators.required, Validators.email]],
    dob: ['',[Validators.required]],
    sex: [''],
    busName: ['', Validators.required],
    address: this.formBuilder.group({
      shop: ['', Validators.required],
      area: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    }),
    gstin: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9][A-Z][0-9]$')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private backconnService: BackconnService,
    private router: Router,
    private snackBar: SnackBarService,
  ) { }

  mustMatch(pass: string, reenter: string) {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(pass);
      const matchingControl = controls.get(reenter);
      if(matchingControl.errors && !matchingControl.errors.mustMatch)
        return null;
      if(control.value !== matchingControl.value)
        matchingControl.setErrors({mustMatch: true});
    }
  }

  onSubmit(): void {
    const formJson = JSON.stringify(this.signupForm.value);
    console.log(formJson);
    this.backconnService.sellerSignup(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.signupForm.reset();
        this.router.navigate(['/seller/login']);
      }
      else {
        this.snackBar.serveSnackBar("Server error");
      }
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    const today = new Date();
    this.maxDate.setFullYear(today.getFullYear()-13);
  }

}
