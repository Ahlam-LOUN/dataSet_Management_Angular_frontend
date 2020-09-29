import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowUsersComponent } from './workflow-users.component';

describe('WorkflowUsersComponent', () => {
  let component: WorkflowUsersComponent;
  let fixture: ComponentFixture<WorkflowUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
