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

  it('should return a validation error if no values are sent', async (done) => {
    const response = await request(app).post('/api/v1/records');
    expect(response.status).toBe(400);
    expect(response.body.msg).toContain('ValidationError');
    done();
  });

  it('should return a validation error if types are invalid', async (done) => {
    const response = await request(app).post('/api/v1/records').send({
      startDate: 3232,
      endDate: true,
      minCount: 'weew',
      maxCount: false,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toContain('ValidationError');
    done();
  });

  it('should filter records and return a response', async (done) => {
    const response = await request(app).post('/api/v1/records').send({
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    });
    const hasRecords = response?.body?.records.lenght > 0;
    expect(response.status).toBe(200);
    expect(response.body.code).toBe(0);
    expect(response.body.msg).toBe('Success');
    if (hasRecords) {
      expect(response.body.records[0]).toHaveProperty('key');
      expect(response.body.records[0]).toHaveProperty('createdAt');
      expect(response.body.records[0]).toHaveProperty('totalCount');
    }
    done();
  });
});
