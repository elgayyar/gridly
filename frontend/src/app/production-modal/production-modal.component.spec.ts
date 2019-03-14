import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionModalComponent } from './production-modal.component';

describe('ProductionModalComponent', () => {
  let component: ProductionModalComponent;
  let fixture: ComponentFixture<ProductionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
