import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BackconnService } from '../backconn.service';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  dispSellers: string = "";
  linkSellers: string = "";

  constructor(
    private backConnService: BackconnService,
    private router: Router,
    private snackBar: SnackBarService,
  ) { }

  isLoggedIn(): string | null {
    return localStorage.getItem('token') ? (localStorage.getItem('name') + '\t') : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate([this.linkSellers]);
  }

  dynaLink(piece: string): string {
    return this.linkSellers + piece;
  }

  whatType(): string | boolean {
    if(this.isLoggedIn())
      return localStorage.getItem('type');
    else
      return false;
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // console.log(e.url);
        if(e.url.indexOf("/seller") == 0) {
          this.dispSellers = " Sellers";
          this.linkSellers = "seller/"
        }
        else {
          this.dispSellers = "";
          this.linkSellers = "";
        }
        // console.log(this.dispSellers);
      }
     });
  }

}
