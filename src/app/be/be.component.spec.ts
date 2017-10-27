import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeComponent } from './be.component';

describe('BeComponent', () => {
  let component: BeComponent;
  let fixture: ComponentFixture<BeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
