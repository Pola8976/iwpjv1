import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { BackconnService } from '../backconn.service';
// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePass = true;

  loginForm = this.formBuilder.group({
    email: ['amitdivekar01@gmail.com', [Validators.required, Validators.email]],
    pass: ['qwerty', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private backconnService: BackconnService,
    private router: Router,
    private snackBar: SnackBarService,
  ) { }

  onSubmit(): void {
    const formJson = JSON.stringify(this.loginForm.value);
    console.log(formJson);
    this.backconnService.login(formJson).subscribe(reply => {
      console.log(reply);
      if(reply.result == "success") {
        this.loginForm.reset();
        localStorage.setItem('token', reply.authToken);
        localStorage.setItem('type', 'customer');
        localStorage.setItem('name', reply.name);
        console.log(sessionStorage.getItem('name'));
        this.router.navigate(['/dash']);
      }
      else if(reply.result == "empty") {
        this.snackBar.serveSnackBar("No such email and/or password");
      }
      else {
        this.snackBar.serveSnackBar("Server error");
      }
    });
  }

  ngOnInit(): void {
  }

}
