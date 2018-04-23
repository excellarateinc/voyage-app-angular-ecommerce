import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(async(() => {

    const loginServiceStub: any = { login: () => { } };
    const windowStub: any = { location: { reload: () => { } } };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: LoginService, useValue: loginServiceStub },
        { provide: 'Window', useValue: windowStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.get(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when calling login()', () => {

    it('should return if the form is invalid', () => {
      spyOn(loginService, 'login');
      component.login();
      expect(loginService.login).not.toHaveBeenCalled();
    });

    it('should call the login service if the form is valid', () => {
      component.loginForm.controls['username'].setValue('username');
      component.loginForm.controls['password'].setValue('password');
      spyOn(loginService, 'login').and.callFake(() => new Observable(o => o.next()));
      component.login();
      expect(loginService.login).toHaveBeenCalled();
    });
  });

});
