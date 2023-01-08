import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchItemComponent } from './catch-item.component';

describe('CatchItemComponent', () => {
  let component: CatchItemComponent;
  let fixture: ComponentFixture<CatchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
