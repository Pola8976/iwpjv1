import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';
import { SnackBarService } from 'src/app/snack-bar.service';

@Component({
  selector: 'app-seller-settings',
  templateUrl: './seller-settings.component.html',
  styleUrls: ['./seller-settings.component.scss']
})
export class SellerSettingsComponent implements OnInit {

  seller;
  maxDate: Date;

	modifyForm = this.formBuilder.group({
		ownName: [{value: '', disabled: true}, Validators.required],
    passwords: this.formBuilder.group({
      pass: [''],
      reenter: [''],
    }, {validators: this.mustMatch('pass', 'reenter')}),
    phone: ['', Validators.pattern('[0-9]*')],
    email: ['', [Validators.required, Validators.email]],
    dob: [{value: '', disabled: true},[Validators.required]],
    sex: [{value: '', disabled: true}],
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
		private router: Router,
		private formBuilder: FormBuilder,
		private backconnService: BackconnService,
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

	// goToView(): void {
	// 	this.router.navigate(['seller/view', this.product.id]);
	// }

  putValues(): void {
    const { name_owner, phone, email, dob, sex, name_business, shop, area, landmark, city, state, pin, gstin } = this.seller;
    this.modifyForm.setValue({
      ownName: name_owner,
      passwords: {
        pass: '',
        reenter: '',
      },
      phone: phone,
      email: email,
      dob: dob,
      sex: sex,
      busName: name_business,
      address: {
        shop: shop,
        area: area,
        landmark: landmark,
        city: city,
        state: state,
        pin: pin,
      },
      gstin: gstin,
    });
    console.log(this.seller);
  }

  getAndPutValues(): void {
    this.backconnService.fetchSellersProfile().subscribe(reply => {
      this.seller = reply.row;
      console.log(reply.row);
      this.putValues();
    });
	}

	onSubmit(): void {
		const formJson = JSON.stringify(this.modifyForm.value);
    console.log(formJson);
    this.backconnService.modifySellersProfile(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.getAndPutValues();
        this.snackBar.serveSnackBar("Profile modified! 👍");
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

		this.getAndPutValues();
  
  }
}
