import client from '@/utils/request';

export function login() {
	return client.request({
		url: '/api/login',
		data: {
			name: 'mock-malakirti',
			password: 'mock-123456',
		},
	});
}

export function logout() {
	return client.request({
		url: '/api/logout',
	});
}
