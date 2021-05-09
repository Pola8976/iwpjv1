import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface ProductDetails {
  id: number;
  prodName: string;
  catName: string;
  price: number;
  stock: number;
  sold: number;
}
var rows: ProductDetails[] = [];

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {
  colOrder: string[] = ['prodName', 'catName', 'price', 'stock', 'sold'];
  businessName: string = localStorage.getItem('business');
  dataSource: MatTableDataSource<ProductDetails>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private backconnService: BackconnService,
  ) { }

  goToDetails(pid: number): void {
    this.router.navigate(['seller/view', pid]);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
    this.backconnService.productFetch(JSON.stringify({allProducts: true})).subscribe(reply => {
      this.dataSource = new MatTableDataSource(reply.rows);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(reply.rows);
    });
  }

}
