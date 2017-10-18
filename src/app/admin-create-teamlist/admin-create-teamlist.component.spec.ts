import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTeamlistComponent } from './admin-create-teamlist.component';

describe('AdminCreateTeamlistComponent', () => {
  let component: AdminCreateTeamlistComponent;
  let fixture: ComponentFixture<AdminCreateTeamlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateTeamlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTeamlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
