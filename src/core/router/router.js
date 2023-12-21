import { Layout } from '@/components/layout/layout.component';
import { ROUTES } from './routes.data';
import { NotFound } from '@/components/screens/not-found/not-found.component';
import { $R } from '../rquery/rquery.lib';

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
	 * Processes all listeners, if the listener link -
	 * redirects via #handleRouteChange.
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
	 * Gets the path from the browser string.
	 * @returns {String} Returns the current path.
	 */
	getCurrentPath() {
		return window.location.pathname;
	}

	/**
	 * Sets the current path.
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
		const component = new this.#currentRoute.component().render();
		console.log(this.#currentRoute.component.name)

		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component
			}).render();

			$R('#app').append(this.#layout)
		} else {
			$R('#content').html('').append(component)
		}
	}
}
