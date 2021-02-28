import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Survey', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('creates a new survey', async () => {
    const response = await request(app)
      .post('/surveys')
      .send({
        title: 'Title example',
        description: 'description example'
      });

    expect(response.status).toBe(201)
  });

  it('return all surveys', async () => {
    await request(app)
      .post('/surveys')
      .send({
        title: 'Title example',
        description: 'description example'
      });

    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });
});