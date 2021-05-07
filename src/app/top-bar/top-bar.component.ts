import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  dispSellers: string = "";

  constructor(
    private backConnService: BackconnService,
    private router: Router,
  ) { }

  isLoggedIn(): string | null {
    return localStorage.getItem('token') ? localStorage.getItem('name') : null;
  }

  logout(): void {
    this.backConnService.logout().subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        localStorage.removeItem('token');
        this.router.navigate(['']);
      }
      else {
        alert("error");
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
        if(e.url.indexOf("/seller/") == 0)
          this.dispSellers = " Sellers";
        else
          this.dispSellers = "";
        
        console.log(this.dispSellers);
      }
     });
  }

}
