import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcroutComponent } from './acrout.component';

describe('AcroutComponent', () => {
  let component: AcroutComponent;
  let fixture: ComponentFixture<AcroutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcroutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcroutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
