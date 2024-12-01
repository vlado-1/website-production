import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsetsumComponent } from './subsetsum.component';

describe('SubsetsumComponent', () => {
  let component: SubsetsumComponent;
  let fixture: ComponentFixture<SubsetsumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsetsumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubsetsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
