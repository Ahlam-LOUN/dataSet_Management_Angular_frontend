import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserComponent } from './list-user.component';

import { DataTablesModule } from 'angular-datatables';

 beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserComponent ], imports: [ DataTablesModule ]
    })
    .compileComponents();
  }));
describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
