import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    private backConnService: BackconnService,
    private router: Router,
  ) { }

  isSetSessionCname(): string | null {
    return sessionStorage.getItem('cname') ? sessionStorage.getItem('cname') : null;
  }

  logout(): void {
    this.backConnService.logout().subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        sessionStorage. removeItem('cname');
        this.router.navigate(['']);
      }
      else {
        alert("error");
      }
    });
  }

  ngOnInit(): void {
  }

}
