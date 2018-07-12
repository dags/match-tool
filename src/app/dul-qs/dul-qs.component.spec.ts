import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DulQsComponent } from './dul-qs.component';

describe('DulQsComponent', () => {
  let component: DulQsComponent;
  let fixture: ComponentFixture<DulQsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DulQsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DulQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
