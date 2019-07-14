import { TestBed, inject } from '@angular/core/testing';
import { StoreService } from './store.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoreService]
    });
  });

  it('should be created', inject([StoreService], (service: StoreService) => {
    expect(service).toBeTruthy();
  }));

  describe('when calling getProductListing()', () => {
    it('should call the users API endpoint',
      inject([StoreService, HttpTestingController], (service: StoreService, httpMock: HttpTestingController) => {
        service.getProducts().subscribe();
        const req = httpMock.expectOne(request => request.url.includes('/store'));
        expect(req.request.method).toEqual('GET');
      }));
  });
});
