import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKampeComponent } from './admin-kampe.component';

describe('AdminKampeComponent', () => {
  let component: AdminKampeComponent;
  let fixture: ComponentFixture<AdminKampeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKampeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKampeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
