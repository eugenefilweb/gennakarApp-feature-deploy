import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaunaForSubmittedViewPage } from './fauna-for-submitted-view.page';

describe('FaunaForSubmittedViewPage', () => {
  let component: FaunaForSubmittedViewPage;
  let fixture: ComponentFixture<FaunaForSubmittedViewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaunaForSubmittedViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaunaForSubmittedViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
