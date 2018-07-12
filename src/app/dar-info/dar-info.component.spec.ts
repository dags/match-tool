import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarInfoComponent } from './dar-info.component';

describe('DarInfoComponent', () => {
  let component: DarInfoComponent;
  let fixture: ComponentFixture<DarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
