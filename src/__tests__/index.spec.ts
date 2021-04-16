import request from 'supertest';

import app, { db } from '../app';

describe('POST', () => {
  afterAll(async (done) => {
    await db.close();
    done();
  });
  it('should fail to hit the record api using get', async (done) => {
    const response = await request(app).get('/api/v1/records');
    expect(response.status).toBe(404);
    done();
  });
});
