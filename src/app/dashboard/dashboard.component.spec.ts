import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { StoreService } from 'app/core/store/store.service';
import { Observable } from 'rxjs';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let storeService: StoreService;

  beforeEach(async(() => {

    const storeServiceStub: any = { getProductListing: () => { } };

    TestBed.configureTestingModule({
      imports: [
        ExamplesModule,
        AngularMaterialModule
      ],
      declarations: [DashboardComponent],
      providers: [
        { provide: StoreService, useValue: storeServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    storeService = TestBed.get(StoreService);
    spyOn(storeService, 'getProductListing').and.callFake(() => new Observable(observer => observer.next()));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(storeService.getProductListing).toHaveBeenCalled();
  });
});
