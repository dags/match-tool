import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OntologiesSelectorComponent } from './ontologies-selector.component';

describe('Component: OntologiesSelector', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [OntologiesSelectorComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([OntologiesSelectorComponent],
      (component: OntologiesSelectorComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(OntologiesSelectorComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(OntologiesSelectorComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-ontologies-selector></app-ontologies-selector>
  `,
  directives: [OntologiesSelectorComponent]
})
class OntologiesSelectorComponentTestController {
}

