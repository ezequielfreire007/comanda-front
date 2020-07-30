import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaEditComponent } from './mesa-edit.component';

describe('MesaEditComponent', () => {
  let component: MesaEditComponent;
  let fixture: ComponentFixture<MesaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
