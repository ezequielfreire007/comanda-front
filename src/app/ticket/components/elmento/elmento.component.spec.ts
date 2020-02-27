import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElmentoComponent } from './elmento.component';

describe('ElmentoComponent', () => {
  let component: ElmentoComponent;
  let fixture: ComponentFixture<ElmentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElmentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
