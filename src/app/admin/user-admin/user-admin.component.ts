import { Component, OnInit } from '@angular/core';
import { User } from '../../core/user/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  users: User[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUsers()
      .subscribe(result => this.users = result);
  }
}
