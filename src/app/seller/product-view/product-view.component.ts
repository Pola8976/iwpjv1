import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';
import { FormControl } from '@angular/forms'
import { Product } from 'src/app/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product: Product;
  stockChange = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backconnService: BackconnService,
  ) { }

  changeStock(add: boolean): void {
    var newStock: number = this.product.stock;
    newStock += add ? this.stockChange.value : -this.stockChange.value;
    console.log(newStock);
    this.backconnService.changeStock(JSON.stringify({ pid: this.product.id, stock: newStock })).subscribe(reply => {
      if(reply.result == "success")
        this.product.stock = newStock;
    });
  }

  goToEdit(): void {
    this.router.navigate(['seller/edit', this.product.id]);
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pidFromRoute = Number(routeParams.get("pid"));

    this.backconnService.productFetch(JSON.stringify({ allProducts: false, pid: pidFromRoute })).subscribe(reply => {
      this.product = reply.rows[0];
      console.log(this.product);
    });
  }

}
