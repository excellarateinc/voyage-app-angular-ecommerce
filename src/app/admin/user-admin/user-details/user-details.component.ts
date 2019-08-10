import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateUser } from './update-user.model';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: UpdateUser;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.adminService.getUser(id)
        .subscribe(result => this.user = result);
    });
  }

  save(): void {
    if (!this.user.accountBalance) {
      return;
    }
    this.adminService.updateUser(this.user)
      .subscribe(result => {
        this.user = result;
        this.notificationService.showSuccessMessage('User updated successfully');
      }, error => {
        this.notificationService.showErrorMessage(error.error[0].errorDescription);
      });
  }

}
