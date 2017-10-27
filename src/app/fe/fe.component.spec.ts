import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeComponent } from './fe.component';

describe('FeComponent', () => {
  let component: FeComponent;
  let fixture: ComponentFixture<FeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
