import User from '@src/models/user/interface/User';

let defaultUserId: string = '';

describe('CRUD', () => {
  beforeAll(async () => {
    await User.deleteMany();
  });

  it('should be able to create user', async () => {
    const newUser = {
      name: 'vinicius',
      password: 'vinicius',
      surname: 'farias',
      username: 'vinicius',
    };

    const { status, body } = await global.testRequest
      .post('/api/users')
      .send(newUser);

    expect(status).toBe(201);
    expect(body).toEqual(expect.objectContaining(newUser));

    defaultUserId = body.id;
  });

  it('should be able to find users', async () => {
    const { body, status } = await global.testRequest.get('/api/users');
    expect(status).toBe(200);

    const defaultUser = {
      name: 'vinicius',
      password: 'vinicius',
      surname: 'farias',
      username: 'vinicius',
    };

    expect(body).toEqual([expect.objectContaining(defaultUser)]);
  });

  it('should be able to update user', async () => {
    const { status } = await global.testRequest
      .patch(`/api/users/${defaultUserId}`)
      .send({
        surname: 'farias 2',
      });
    expect(status).toBe(204);
  });

  it('should be able to find user by id', async () => {
    const { body, status } = await global.testRequest.get(
      `/api/users/${defaultUserId}`
    );
    expect(status).toBe(200);

    const defaultUserUpdated = {
      name: 'vinicius',
      password: 'vinicius',
      surname: 'farias 2',
      username: 'vinicius',
    };

    expect(body).toEqual(expect.objectContaining(defaultUserUpdated));
  });
});
