import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateUser } from './update-user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: UpdateUser;

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.adminService.getUser(id)
        .subscribe(result => this.user = result);
    });
  }

  save() {
    this.adminService.updateUser(this.user)
      .subscribe(result => this.user = result);
  }

}
