import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarJsonComponent } from './dar-json.component';

describe('DarJsonComponent', () => {
  let component: DarJsonComponent;
  let fixture: ComponentFixture<DarJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
