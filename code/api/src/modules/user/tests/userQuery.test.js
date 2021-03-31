import request from 'supertest'; // import request library from supertest
import express from 'express'; // import express so we can create a mock server
import graphqlHTTP from 'express-graphql'; // import graphqlHTTP express library
import schema from '../../../setup/schema'; // import our graphql schema

describe('user queries', async () => {
  let server = express();

  beforeAll(() => {
    server.use(
      "/",
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  });
  it('returns all users emails', async(done) => {
    const response = await request(server)
      .post('/')
      .send({query: `{users {email}}`})
      .expect(200)

      expect(response.body).toMatchObject({
        data: {
          users: [
            {email: 'admin@crate.com'},
            {email: 'user@crate.com'}
          ]
        }
      })
      done();
    })
})
