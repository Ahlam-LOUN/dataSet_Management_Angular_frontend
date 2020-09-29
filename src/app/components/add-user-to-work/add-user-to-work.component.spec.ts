import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToWorkComponent } from './add-user-to-work.component';

describe('AddUserToWorkComponent', () => {
  let component: AddUserToWorkComponent;
  let fixture: ComponentFixture<AddUserToWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
