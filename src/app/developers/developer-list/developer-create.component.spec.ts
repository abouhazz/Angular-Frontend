import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersListComponent } from './developer-list.component';

describe('SignupComponent', () => {
  let component: DevelopersListComponent;
  let fixture: ComponentFixture<DevelopersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});