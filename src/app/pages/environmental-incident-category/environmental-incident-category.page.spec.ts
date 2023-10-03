import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnvironmentalIncidentCategoryPage } from './environmental-incident-category.page';

describe('EnvironmentalIncidentCategoryPage', () => {
  let component: EnvironmentalIncidentCategoryPage;
  let fixture: ComponentFixture<EnvironmentalIncidentCategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentalIncidentCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentalIncidentCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
