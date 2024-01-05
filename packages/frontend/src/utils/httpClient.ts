class HttpClient {
	async get(endpoint: string, headers: object = {}) {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
			method: 'GET',
			credentials: 'include',
			headers: { ...headers }
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}

	async post(endpoint: string, body: object, headers: object = {}): Promise<any> {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				...headers
			},

			body: JSON.stringify(body)
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}

	async put(endpoint: string, body: object, headers: object = {}): Promise<any> {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				...headers
			},
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}

	async delete(endpoint: string, body: object = {}, headers: object = {}): Promise<any> {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				...headers
			},
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}
}

export default HttpClient;