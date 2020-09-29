import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOutWorkflowComponent } from './data-out-workflow.component';

describe('DataOutWorkflowComponent', () => {
  let component: DataOutWorkflowComponent;
  let fixture: ComponentFixture<DataOutWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOutWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOutWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
