import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import styles from './loader.module.scss';
import template from './loader.template.html';

export const LOADER_SELECTOR = '[data-component="loader"]';

export class Loader extends ChildComponent {
	constructor() {
		super();
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		return this.element;
	}
}
