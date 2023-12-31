import ChildComponent from '../component/child.component';

class RenderService {
	/**
	 * Converts html to htmlElement
	 * @param {String} html
	 * @param {Array} components
	 * @param {Object} [styles]
	 * @returns {HTMLElement}
	 */
	htmlToElement(html, components = [], styles) {
		const template = document.createElement('template');
		template.innerHTML = html.trim();

		const element = template.content.firstChild;

		if (styles) {
			this.#applyModuleStyles(styles, element)
		}

		this.#replaceComponentText(element, components);

		return element;
	}

	/**
	 * @param {HTMLElement} parentElement
	 * @param {Array} components
	 */
	#replaceComponentText(parentElement, components) {
		const componentTagsPattern = /^component/;
		const allElements = parentElement.getElementsByTagName('*');

		for (const element of allElements) {
			const elementTagName = element.tagName.toLowerCase();

			if (componentTagsPattern.test(elementTagName)) {
				const componentName = elementTagName
					.replace(componentTagsPattern, '')
					.replace(/-/g, '');

				const foundComponent = components.find(Component => {
					const instance =
						Component instanceof ChildComponent ? Component : new Component();

					return instance.constructor.name.toLowerCase() === componentName;
				});

				if (foundComponent) {
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()
							: new foundComponent().render();

					element.replaceWith(componentContent);
				} else {
					console.error(
						`Component "${componentName}" not found in the provided components array`,
					);
				}
			}
		}
	}

	/**
	 * @param {Object} moduleStyles Modular styles.
	 * @param {String} element Parent element.
	 * @returns {void}
	 */
	#applyModuleStyles(moduleStyles, element) {
		if (!element) return;

		/**
		 * The function traverses the element's classes
		 * and generates a new class.
		 */
		const applayStyles = element => {
			for (const [key, value] of Object.entries(moduleStyles)) {
				if (element.classList.contains(key)) {
					element.classList.remove(key);
					element.classList.add(value);
				}
			}
		};

		// If the parent has a class attribute, the styles are 
		// applied to it as well
		if (element.getAttribute('class')) {
			applayStyles(element);
		}

		const elements = element.querySelectorAll('*');
		elements.forEach(applayStyles);
	}
}

export default new RenderService();
