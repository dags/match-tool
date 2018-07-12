import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DulInfoComponent } from './dul-info.component';

describe('DulInfoComponent', () => {
  let component: DulInfoComponent;
  let fixture: ComponentFixture<DulInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DulInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DulInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
