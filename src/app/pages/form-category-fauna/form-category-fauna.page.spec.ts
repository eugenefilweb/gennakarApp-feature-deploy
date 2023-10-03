import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormCategoryFaunaPage } from './form-category-fauna.page';

describe('FormCategoryFaunaPage', () => {
	let component: FormCategoryFaunaPage;
	let fixture: ComponentFixture<FormCategoryFaunaPage>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ FormCategoryFaunaPage ],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(FormCategoryFaunaPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
