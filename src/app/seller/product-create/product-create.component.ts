import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';
import { SnackBarService } from 'src/app/snack-bar.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productCreationForm = this.formBuilder.group({
    prodName: ['', Validators.required],
    category: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  rows = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private backConnService: BackconnService,
    private snackBar: SnackBarService,
    private backconnService: BackconnService,
  ) { }

  onSubmit(): void {
    const formJson = JSON.stringify(this.productCreationForm.value);
    console.log(formJson);
    this.backconnService.productCreate(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.productCreationForm.reset();
        this.snackBar.serveSnackBar("Product created! 🎉🎊");
        // this.router.navigate(['seller/view']);
      }
      else {
        this.snackBar.serveSnackBar("Server error");
      }
    });
  }

  ngOnInit(): void {
    this.backconnService.fetchCategories().subscribe(reply => {
      this.rows = reply.rows;
      console.log(reply.rows);
    });
  }
}