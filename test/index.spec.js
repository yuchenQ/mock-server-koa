import supertest from 'supertest';
import createApp from './helper/createApp';

describe('Create Mock Server', () => {
  let app;

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Happy pass', () => {
    it('nested request props', async () => {
      await supertest(app)
        .get('/deposits?filter%5Bwhere%5D%5Bstate%5D%5Binq%5D%5B0%5D=PROCESSED&filter%5Bwhere%5D%5Bstate%5D%5Binq%5D%5B1%5D=REJECTED')
        .expect(200, {
          deposits: [],
        });
    });

    it('request query and response body', async () => {
      await supertest(app)
        .get('/greeting?name=Alice')
        .expect(200, {
          message: 'Good day!',
        });
    });

    it('response handler', async () => {
      await supertest(app)
        .post('/users')
        .send({
          user: {
            name: 'Alice',
          },
        })
        .expect(200, {
          user: {
            name: 'Alice',
          },
        });

      await supertest(app)
        .post('/users')
        .send({
          foo: 'bar',
        })
        .expect(400, {
          errors: [{
            name: 'GO_AWAY',
            message: 'I don\'t like foo === bar',
          }],
        });
    });

    it('request properties', async () => {
      const userUuid = '878475b7-2b97-4736-92f2-30c83ed06a78';
      await supertest(app)
        .put(`/users/${userUuid}/age`)
        .send({
          age: 18,
        })
        .expect(200);
    });

    it('request properties array', async () => {
      await supertest(app)
        .post('/grant-roles')
        .send({
          roles: [18],
        })
        .expect(200);
    });

    it('request nested property', async () => {
      await supertest(app)
        .post('/admins')
        .send({
          admin: {
            email: 'Wade_Lesch99@gmail.com',
            roles: [18],
          },
        })
        .expect(200);
    });

    it('with optional request properties', async () => {
      await supertest(app)
        .get('/blogs?pageNumber=1&pageSize=25&search=hello')
        .expect(200);
    });

    it('without optional request properties', async () => {
      await supertest(app)
        .get('/blogs?pageNumber=1&pageSize=25')
        .expect(200);
    });

    it('response error', async () => {
      await supertest(app)
        .post('/error')
        .send({
          error: {
            name: 'CONFLICT',
          },
        })
        .expect(409);
    });
  });

  describe('Not pass', () => {
    it('request query and response body', async () => {
      await supertest(app)
        .get('/greeting?foo=bar')
        .expect(500, {
          message: '/greeting DOES NOT MATCH',
          expectedQuery: { name: 'String' },
          receivedQuery: { foo: 'bar' },
        });
    });

    it('request properties', async () => {
      const userUuid = '878475b7-2b97-4736-92f2-30c83ed06a78';
      await supertest(app)
        .put(`/users/${userUuid}/age`)
        .send({ age: '18' })
        .expect(500, {
          message: '/users/:userUuid/age DOES NOT MATCH',
          expectedBody: { age: 'Number' },
          receivedBody: { age: '18' },
        });
    });

    it('optional request properties', async () => {
      await supertest(app)
        .post('/reset-count')
        .send({ count: '18' })
        .expect(500, {
          message: '/reset-count DOES NOT MATCH',
          expectedBody: { count$: 'Number' },
          receivedBody: { count: '18' },
        });
    });
  });
});
