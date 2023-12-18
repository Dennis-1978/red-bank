import { Layout } from '@/components/layout/layout.component';
import { ROUTES } from './routes.data';
import { NotFound } from '@/components/screens/not-found/not-found.component';

/**
 * Маршрутизатор
 */
export class Router {
	#routes = ROUTES;
	#currentRoute = null;
	#layout = null;

	constructor() {
		window.addEventListener('popstate', () => {
			this.#handleRouteChange
		})

		this.#handleRouteChange();
		this.#handleLinks();
	}

	/**
	 * Обрабатывает все слушатели, если слушатель ссылка -
	 * производит переадресацию через #handleRouteChange.
	 */
	#handleLinks() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a');

			if (target) {
				event.preventDefault();

				this.navigate(target.href)
			}
		})
	}

	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '', path)
			this.#handleRouteChange();
		}
	}

	/**
	 * Получает путь из строки браузера
	 * @returns {String} Возвращает текущий путь
	 */
	getCurrentPath() {
		return window.location.pathname;
	}

	/**
	 * Устанавливает текущий путь
	 */
	#handleRouteChange() {
		const path = this.getCurrentPath() || '/';

		let route = this.#routes.find(route => route.path === path);

		if (!route) {
			route = {
				component: NotFound,
			};
		}

		this.#currentRoute = route;
		this.#render();
	}

	#render() {
		const component = new this.#currentRoute.component();

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component.render()
			});

			document.getElementById('app').innerHTML = this.#layout.render();
		} else {
			document.querySelector('main').innerHTML = component.render();
		}
	}
}
