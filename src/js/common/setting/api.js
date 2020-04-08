window.API = {}

/**
 * Set endpoints from API
 */
API.ENDPOINT = {
	TEST: 'http://dummy.restapiexample.com/api/v1/employees',
	// TEST: '/data/test.json',
}

/**
 * Get API
 */
window.GETAPI = opts => {
	if (API.ENDPOINT[opts.name]) {
		API[opts.name] = {}

		Axios({
			type: 'get',
			url: API.ENDPOINT[opts.name],
		})
			.then(res => {
				API[opts.name].STATUS = res.status
				API[opts.name].DATA = res.data.data || res.data
			})
			.catch(err => {
				API[opts.name].STATUS = err.response.status
				API[opts.name].DATA = null
			})
			.done(() => {
				const message = `[GETAPI: ${opts.name}]: ${API[opts.name].STATUS}`

				API[opts.name].DATA
					? opts.onSuccess()
					: opts.onError(new Error(message))
			})
	} else {
		const message = `[GETAPI: ${opts.name}]: endpoint unset`

		opts.onError(new Error(message))
	}
}
