import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOutWorkComponent } from './user-out-work.component';

describe('UserOutWorkComponent', () => {
  let component: UserOutWorkComponent;
  let fixture: ComponentFixture<UserOutWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOutWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOutWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
