import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarQsComponent } from './dar-qs.component';

describe('DarQsComponent', () => {
  let component: DarQsComponent;
  let fixture: ComponentFixture<DarQsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarQsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
