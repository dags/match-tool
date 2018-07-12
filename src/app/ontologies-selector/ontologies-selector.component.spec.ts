import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologiesSelectorComponent } from './ontologies-selector.component';

describe('OntologiesSelectorComponent', () => {
  let component: OntologiesSelectorComponent;
  let fixture: ComponentFixture<OntologiesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologiesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
