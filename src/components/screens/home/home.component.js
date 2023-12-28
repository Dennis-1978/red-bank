import { BaseScreen } from '@/core/component/base-screen.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import template from './home.template.html';
import styles from './home.module.scss';
import { Loader } from '@/components/ui/loader/loader.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' });
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Loader(),
				new UserItem(
					{
						avatarPath:
							'https://papik.pro/uploads/posts/2021-09/1631773650_15-papik-pro-p-prikolnie-risunki-vse-15.jpg',
						name: 'Guffi',
					},
					false,
					() => alert('Hey'),
				),
			],
			styles,
		);

		$R(element).find('h1').css('color', 'blue');

		return element;
	}
}
