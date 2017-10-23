import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKampeCreatekampComponent } from './admin-kampe-createkamp.component';

describe('AdminKampeCreatekampComponent', () => {
  let component: AdminKampeCreatekampComponent;
  let fixture: ComponentFixture<AdminKampeCreatekampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKampeCreatekampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKampeCreatekampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
