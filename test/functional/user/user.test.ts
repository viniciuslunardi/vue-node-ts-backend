describe('CRUD', () => {
	it('should be able to find users', async () => {
		const { body, status } = await global.testRequest.get('/api/users');
		expect(status).toBe(200);
		console.log(body);
		expect(body).toEqual([{
			'__v': 0,
			'_id': '621ed461ac4a470605b90227',
			'name': 'vinicius',
			'password': 'vinicius',
			'surname': 'farias',
			'username': 'vinicius',
		}]);
	});
	
	it('should be able to create user', async () => {
		const { status } = await global.testRequest.post('/api/users').send({
			'username': 'vinicius 2',
			'password': 'vinicius 2',
			'name': 'vinicius 2',
			'surname': 'farias 2',
		});
		
		expect(status).toBe(200);
	});
});