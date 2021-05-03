import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackconnService } from '../backconn.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
        sessionStorage.setItem('cname', reply.cname);
        console.log(sessionStorage.getItem('cname'));
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
