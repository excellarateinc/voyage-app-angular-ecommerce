import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { StoreService } from '../shared/services/store.service';
import { Observable } from 'rxjs';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let storeService: StoreService;

  beforeEach(async(() => {

    const storeServiceStub: any = { getProductListing: () => { } };

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [StoreComponent],
      providers: [
        { provide: StoreService, useValue: storeServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    storeService = TestBed.inject(StoreService);
    spyOn(storeService, 'getProducts').and.callFake(() => new Observable(observer => observer.next()));
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(storeService.getProducts).toHaveBeenCalled();
  });
});
