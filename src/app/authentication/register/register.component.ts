import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RegisterService } from './register.service';
import { Register } from './register.model';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registrationErrors: Array<any>;
  isMobile = false;
  invitationToken: string;
  working = false;
  private watcher: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar,
    private mobileService: MobileService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });

    this.route.queryParams.subscribe(async params => {
      this.invitationToken = params['invitationToken'];
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.working = true;
    const register = this.registerForm.value as Register;
    register.invitationToken = this.invitationToken;
    this.registerService.register(register)
      .subscribe(() => {
        this.working = false;
        this.snackBar.open('Registration successful', null, {
          duration: 2000
        });
        this.router.navigate(['/authentication/login']);
      }, errors => {
        this.working = false;
        this.registrationErrors = errors.error;
      });
  }

  get phones(): FormArray {
    return this.registerForm.get('phones') as FormArray;
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phones: this.formBuilder.array([
        this.formBuilder.group({
          phoneNumber: ['', Validators.required],
          phoneType: ['Mobile', Validators.required]
        })
      ])
    });
  }
}
