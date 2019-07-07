import { Component, OnInit } from '@angular/core';
import { ContactUsService } from './contact-us.service';
import { ContactUs } from './contact-us.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  invitedBy: ContactUs;

  constructor(private contactUsService: ContactUsService) { }

  ngOnInit() {
    this.contactUsService.getInvitedBy()
      .subscribe(result => this.invitedBy = result);
  }

}
