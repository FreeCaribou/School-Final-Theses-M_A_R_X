import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipPage } from './relationship.page';

describe('RelationshipPage', () => {
  let component: RelationshipPage;
  let fixture: ComponentFixture<RelationshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
