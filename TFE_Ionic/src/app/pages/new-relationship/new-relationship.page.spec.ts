import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRelationshipPage } from './new-relationship.page';

describe('NewRelationshipPage', () => {
  let component: NewRelationshipPage;
  let fixture: ComponentFixture<NewRelationshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRelationshipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRelationshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
