import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeighborhoodPage } from './neighborhood.page';

describe('NeighborhoodPage', () => {
  let component: NeighborhoodPage;
  let fixture: ComponentFixture<NeighborhoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighborhoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeighborhoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
