import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampelistComponent } from './kampelist.component';

describe('KampelistComponent', () => {
  let component: KampelistComponent;
  let fixture: ComponentFixture<KampelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
