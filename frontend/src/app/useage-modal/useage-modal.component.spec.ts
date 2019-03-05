import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseageModalComponent } from './useage-modal.component';

describe('UseageModalComponent', () => {
  let component: UseageModalComponent;
  let fixture: ComponentFixture<UseageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
