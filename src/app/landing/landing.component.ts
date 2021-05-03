import { Component, OnInit } from '@angular/core';
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private backconnService: BackconnService,
  ) { }

  ngOnInit(): void {
    
  }
}
