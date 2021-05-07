import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BackconnService } from 'src/app/backconn.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss']
})
export class SellerLoginComponent implements OnInit {

  hidePass = true;

  loginForm = this.formBuilder.group({
    email: ['amit@example.com', [Validators.required, Validators.email]],
    pass: ['Aa!12345', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private backconnService: BackconnService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) { }

  onSubmit(): void {
    const formJson = JSON.stringify(this.loginForm.value);
    console.log(formJson);
    this.backconnService.login(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.loginForm.reset();
        sessionStorage.setItem('sname', reply.sname);
        console.log(sessionStorage.getItem('sname'));
        this.router.navigate(['/dash']);
      }
      else if(reply.result == "empty") {
        this.matSnackBar.open('No such email and/or password', 'X', {
          horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
          verticalPosition: 'top' as MatSnackBarVerticalPosition,
        });
      }
      else {
        alert("server error");
      }
    });
  }

  ngOnInit(): void {
  }

}
