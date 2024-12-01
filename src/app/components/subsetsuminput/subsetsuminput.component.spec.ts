import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsetsuminputComponent } from './subsetsuminput.component';

describe('SubsetsuminputComponent', () => {
  let component: SubsetsuminputComponent;
  let fixture: ComponentFixture<SubsetsuminputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsetsuminputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubsetsuminputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
