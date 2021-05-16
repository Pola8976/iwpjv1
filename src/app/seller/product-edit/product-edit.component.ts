import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';
import { Product } from 'src/app/product';
import { SnackBarService } from 'src/app/snack-bar.service';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

	product: Product;
	rows = [];

	productModificationForm = this.formBuilder.group({
		prodName: ['', Validators.required],
    category: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private backconnService: BackconnService,
		private snackBar: SnackBarService,
	) { }

	goToView(): void {
		this.router.navigate(['seller/view', this.product.id]);
	}

	revert(): void {
		const { prodName, catId, description, price, stock } = this.product;
		this.productModificationForm.setValue({
			prodName: prodName,
			category: catId,
			description: description,
			price: price,
			stock: stock,
		});
	}

	onSubmit(): void {
		const withPid = {pid: this.product.id};
		Object.assign(withPid, this.productModificationForm.value);
    this.backconnService.productModify(JSON.stringify(withPid)).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.productModificationForm.reset();
        this.snackBar.serveSnackBar("Product modified! 🎉🎊");
        this.router.navigate(['seller/view', this.product.id]);
      }
      else {
        this.snackBar.serveSnackBar("Server error");
      }
    });
	}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		const pidFromRoute = Number(routeParams.get("pid"));

		this.backconnService.fetchCategories().subscribe(reply => {
      this.rows = reply.rows;
      console.log(reply.rows);
    });

		this.backconnService.productFetch(JSON.stringify({ allProducts: false, pid: pidFromRoute })).subscribe(reply => {
			this.product = reply.rows[0];
			const { prodName, catId, description, price, stock } = this.product;
			this.productModificationForm.setValue({
				prodName: prodName,
				category: catId,
				description: description,
				price: price,
				stock: stock,
			});
			console.log(this.product);
		});
	}

}
