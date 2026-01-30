import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Remove trailing slash if present (prevents double-slash errors)
api.defaults.baseURL = api.defaults.baseURL.replace(/\/$/, '');

// 🔐 Automatically attach token on every request
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('instamakaan_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export default api;
