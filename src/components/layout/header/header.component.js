import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import styles from './header.module.scss';
import template from './header.template.html';
import { Logo } from './logo/logo.component';
import { LogoutButton } from './logout-button/logout-button.component';
import { Search } from './search/search.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

export class Header extends ChildComponent {
	constructor({router}) {
		super();

		this.router = router;
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({router: this.router}),
				Search,
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

		return this.element;
	}
}
