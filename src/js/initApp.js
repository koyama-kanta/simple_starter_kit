export default class App {
	constructor(el) {
		this.el = el
		this.elem = el.querySelectorAll('[data-module]')
		this.api = el.dataset.api ? el.dataset.api.split(',') : []

		this.init()
	}

	init() {
		this.AppGetAPI().done(
			() => {
				this.AppImportModules()
			},
			err => APP.MODE === 'development' && console.error(err)
		)
	}

	AppGetAPI() {
		return Promise.map(
			this.api,
			api =>
				new Promise((resolve, reject) => {
					GETAPI({
						name: api,
						onSuccess: () => resolve(),
						onError: err => reject(err),
					})
				})
		)
	}

	AppImportModules() {
		this.elem.forEach(el => {
			const Module = el.dataset.module
			APP.MODULES[Module] =
				APP.MODULES[Module] || require(`~/modules/${Module}`).default
			new APP.MODULES[Module](el)
		})
	}
}
