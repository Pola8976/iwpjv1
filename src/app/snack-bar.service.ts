import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private matSnackBar: MatSnackBar,
  ) { }

  serveSnackBar(msg: string, action: string = 'X', x = 'center', y = 'top') {
    this.matSnackBar.open('No such email and/or password', 'X', {
      horizontalPosition: x as MatSnackBarHorizontalPosition,
      verticalPosition: y as MatSnackBarVerticalPosition,
    });
  }
}
