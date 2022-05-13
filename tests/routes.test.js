const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const values = require('./testValues');
require('dotenv').config();

const userToken = process.env.TEST_USER_TOKEN;
const clientToken = process.env.TEST_CLIENT_TOKEN;

// users
describe('userRegister', () => {
  test('Add new user', () => {
    return request(app)
      .post('/api/users/register')
      .send(values.newUser)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("true");
      });
  });
});

describe('userLogin', () => {
  test('Login user', () => {
    return request(app)
      .post('/api/users/login')
      .send(values.userLogin)
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe('getUser', () => {
  test('Display user details', () => {
    return request(app)
      .get('/api/users/details')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});

// client
describe('clientRegister', () => {
  test('Add new client', () => {
    return request(app)
      .post('/api/clients/register')
      .send(values.newClient)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("true");
      });
  });
});

describe('clientLogin', () => {
  test('Login client', () => {
    return request(app)
      .post('/api/clients/login')
      .send(values.clientLogin)
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe('getClient', () => {
  test('Display client details', () => {
    return request(app)
      .get('/api/clients/details')
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});

// store
describe('getStoresByClient', () => {
  test('Display stores under a client', () => {
    return request(app)
      .get('/api/stores')
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe('getByStoreId', () => {
  test('Display store details by id', () => {
    return request(app)
      .get(`/api/stores/${values.storeId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        const storeData = JSON.parse(res.text);
        console.log(storeData);
        expect(res.statusCode).toBe(200);
      });
  });
});

// orders
describe('getByOrderId', () => {
  test('Display order details by id', () => {
    return request(app)
      .get(`/api/orders/${values.orderId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        const orderData = JSON.parse(res.text);
        expect(orderData).toHaveProperty('userId');
        expect(res.statusCode).toBe(200);
      });
  });
});

// items

afterAll(() => {
  mongoose.connection.close();
});
