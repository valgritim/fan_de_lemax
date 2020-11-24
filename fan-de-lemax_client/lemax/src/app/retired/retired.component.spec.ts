import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiredComponent } from './retired.component';

describe('RetiredComponent', () => {
  let component: RetiredComponent;
  let fixture: ComponentFixture<RetiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
