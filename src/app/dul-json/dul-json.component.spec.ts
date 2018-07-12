import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DulJsonComponent } from './dul-json.component';

describe('DulJsonComponent', () => {
  let component: DulJsonComponent;
  let fixture: ComponentFixture<DulJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DulJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DulJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
