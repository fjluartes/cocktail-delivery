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
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('firstName');
        expect(data).toHaveProperty('lastName');
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('orders');
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
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('contactNo');
        expect(data).toHaveProperty('stores');
      });
  });
});

// store
describe('addStore', () => {
  test('Adds new store', () => {
    return request(app)
      .post('/api/stores/add')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(values.newStore)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("true");
      });
  });
});

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
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('address');
        expect(data).toHaveProperty('contactNo');
        expect(data).toHaveProperty('clientId');
        expect(data).toHaveProperty('menu');
        expect(data).toHaveProperty('isActive');
        expect(data).toHaveProperty('orders');
      });
  });
});

// orders
describe('addOrder', () => {
  test('Adds new order', () => {
    return request(app)
      .post('/api/orders/add')
      .set('Authorization', `Bearer ${userToken}`)
      .send(values.newOrder)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("true");
      });
  });
});

describe('getByOrderId', () => {
  test('Display order details by id', () => {
    return request(app)
      .get(`/api/orders/${values.orderId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('userId');
        expect(data).toHaveProperty('userName');
        expect(data).toHaveProperty('address');
        expect(data).toHaveProperty('contactNo');
        expect(data).toHaveProperty('storeId');
        expect(data).toHaveProperty('items');
        expect(data).toHaveProperty('total');
        expect(data).toHaveProperty('status');
      });
  });
});

// items
describe('getByItemId', () => {
  test('Display item details by itemId', () => {
    return request(app)
      .get(`/api/items/lookup?i=${values.itemId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('drinks');
      });
  });
});

describe('getByQuery', () => {
  test('Display items by query', () => {
    return request(app)
      .get(`/api/items/query?s=${values.itemQuery}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('drinks');
      });
  });
});

describe('getByFilter', () => {
  test('Display items by filter', () => {
    return request(app)
      .get(`/api/items/filter?c=${values.itemFilter}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send()
      .then(res => {
        const data = JSON.parse(res.text);
        expect(res.statusCode).toBe(200);
        expect(data).toHaveProperty('drinks');
      });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
