import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreComponent } from './store.component';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { StoreService } from 'app/core/store/store.service';
import { Observable } from 'rxjs';


describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let storeService: StoreService;

  beforeEach(async(() => {

    const storeServiceStub: any = { getProductListing: () => { } };

    TestBed.configureTestingModule({
      imports: [
        ExamplesModule,
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
    storeService = TestBed.get(StoreService);
    spyOn(storeService, 'getProductListing').and.callFake(() => new Observable(observer => observer.next()));
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(storeService.getProductListing).toHaveBeenCalled();
  });
});