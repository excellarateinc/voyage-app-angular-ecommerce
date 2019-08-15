import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  showSuccessMessage(message: string): void {
    this.snackbar.open(message, '', { duration: 3000, panelClass: ['success-snack'] });
  }

  showErrorMessage(message: string): void {
    this.snackbar.open(message, '', { duration: 3000, panelClass: ['error-snack'] });
  }
}
