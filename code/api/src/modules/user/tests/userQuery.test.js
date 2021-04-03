import request from 'supertest'; // import request library from supertest
import express from 'express'; // import express so we can create a mock server
import graphqlHTTP from 'express-graphql'; // import graphqlHTTP express library
import schema from '../../../setup/schema'; // import our graphql schema

const user = require("../model")
import models from "../../../setup/models"
const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const { assert } = referee.assert;
import * as auth from '../../../setup/authentication.js';
import { getByUser } from '../../delivery/resolvers.js'

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
    sinon.stub(auth, 'default')
      .callsFake(function(req, res, next) {
        return next();
      });
    let mockLogin = jest.spyOn(auth, "default");
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
            {email: 'user1@crate.com'},
            {email: 'user2@crate.com'}
          ]
        }
      })
      done();
    })

  it('returns all users crateProducts and nested associations', async(done) => {
    const response = await request(server)
      .post('/')
      .send({query: `{
  user(id:1)
  {
    email
    shippingAddress
    description
    deliveries
    {
      status
      crateProduct
      {
        crate
        {
          deliveryDate
        }
      }
    }
  }
}`
    })
      .expect(200)


      expect(response.body).toMatchObject({
        data: {
          user: {
            email: "admin@crate.com",
            shippingAddress: null,
            description: null,
            deliveries: {
              status: 'ADMIN',
              crateProduct:
              {
                crate:
                {
                  deliveryDate: 'b'
                }
              }
            }
          }
        }
      })
      done();
    })
});
