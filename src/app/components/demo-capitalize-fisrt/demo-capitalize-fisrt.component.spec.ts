import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCapitalizeFisrtComponent } from './demo-capitalize-fisrt.component';

describe('DemoCapitalizeFisrtComponent', () => {
  let component: DemoCapitalizeFisrtComponent;
  let fixture: ComponentFixture<DemoCapitalizeFisrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoCapitalizeFisrtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoCapitalizeFisrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
