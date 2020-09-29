import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDataComponent } from './workflow-data.component';

describe('WorkflowDataComponent', () => {
  let component: WorkflowDataComponent;
  let fixture: ComponentFixture<WorkflowDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
