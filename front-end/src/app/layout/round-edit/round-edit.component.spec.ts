import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundEditComponent } from './round-edit.component';

describe('RoundEditComponent', () => {
  let component: RoundEditComponent;
  let fixture: ComponentFixture<RoundEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
