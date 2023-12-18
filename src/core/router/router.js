import { ROUTES } from './routes.data';
import { NotFound } from '@/components/screens/not-found/not-found.component';

/**
 * Маршрутизатор
 */
export class Router {
	#routes;
	#currentRoute;

	constructor() {
		this.#routes = ROUTES;
		this.#currentRoute = null;
		this.#handleRouteChange();
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
		console.log(route)

		if (!route) {
			route = {
				component: NotFound,
			};
		}

		this.#currentRoute = route;
		this.render();
	}

	render() {
		const component = new this.#currentRoute.component();

		document.getElementById('app').innerHTML = component.render();
	}
}
