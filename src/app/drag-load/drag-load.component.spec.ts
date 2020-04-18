import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragLoadComponent } from './drag-load.component';

describe('DragLoadComponent', () => {
  let component: DragLoadComponent;
  let fixture: ComponentFixture<DragLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
