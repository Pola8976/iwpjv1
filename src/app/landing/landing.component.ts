import { Component, OnInit } from '@angular/core';
import { BackconnService } from '../backconn.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  rotateValue: string;

  constructor(
    // private backconnService: BackconnService,
  ) { }

  shift(isUp: boolean): void {
    var circle=document.getElementById("circle");
    var upBtn=document.getElementById("upBtn");
    var downBtn=document.getElementById("downBtn");

    var rotateSum = this.rotateValue + (isUp ? "rotate(-90deg)" : "rotate(+90deg)");
    circle.style.transform = rotateSum;
    this.rotateValue = rotateSum;

    console.log(`shift ${isUp} ${this.rotateValue}`);
  }

  ngOnInit(): void {
    this.rotateValue = document.getElementById("circle").style.transform;
  }
}
