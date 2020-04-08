import sample from '~/common/sample'

export default class {
	constructor(el) {
		this.el = el
		this.data = API.TEST ? API.TEST.DATA : []
		this.renderer = el.querySelector('[data-test-renderer]')

		this.init()
	}

	init() {
		this.data.forEach(data => {
			const el = document.createElement('p')
			el.innerHTML = `${sample(data.id)}. ${data.employee_name}`
			this.renderer.append(el)
		})
	}
}
