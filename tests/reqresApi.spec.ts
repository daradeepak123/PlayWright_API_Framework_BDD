import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { ReqresApiClient } from '../src/api/ReqresApiClient';

const runtimeEnv = (globalThis as typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
}).process?.env ?? {};

test.describe('ReqRes API framework', () => {
  test.skip(!runtimeEnv.REQRES_API_KEY, 'Set REQRES_API_KEY in .env to run the live ReqRes API tests.');

  const api = new ReqresApiClient();

  async function getLiveUserId(): Promise<number> {
    const users = await api.listUsers(1);
    expect(users.data.length).toBeGreaterThan(0);
    return users.data[0].id;
  }

  test('GET /api/users returns a paginated user list', async () => {
    const response = await api.listUsers(2);

    expect(response.page).toBe(2);
    expect(response.per_page).toBeGreaterThan(0);
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('GET /api/users/{id} returns the correct user', async () => {
    const userId = await getLiveUserId();
    const response = await api.getUser(userId);

    expect(response.data.id).toBe(userId);
    expect(response.data.email).toContain('@reqres.in');
  });

  test('POST /api/users creates a new user', async () => {
    const response = await api.createUser({
      name: 'morpheus',
      job: 'leader'
    });

    expect(response.name).toBe('morpheus');
    expect(response.job).toBe('leader');
    expect(Number(response.id)).toBeGreaterThan(0);
  });

  test('PUT /api/users/{id} updates an existing user', async () => {
    const userId = await getLiveUserId();
    const response = await api.updateUser(userId, {
      name: 'morpheus',
      job: 'zion resident'
    });

    expect(response.name).toBe('morpheus');
    expect(response.job).toBe('zion resident');
  });

  test('POST /api/login returns token for valid credentials', async () => {
    const response = await api.login({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    });

    expect(response.token).toBeTruthy();
  });
});
