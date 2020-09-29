import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListValuesComponent } from './list-values.component';

describe('ListValuesComponent', () => {
  let component: ListValuesComponent;
  let fixture: ComponentFixture<ListValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
