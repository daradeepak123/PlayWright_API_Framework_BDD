# ReqRes API Framework

This framework provides a lightweight HTTP wrapper for the public ReqRes API.

## Example usage

```ts
import { ReqresApiClient } from './ReqresApiClient';

const api = new ReqresApiClient(process.env.REQRES_BASE_URL, process.env.REQRES_API_KEY);

const users = await api.listUsers(2);
const createdUser = await api.createUser({ name: 'morpheus', job: 'leader' });
const login = await api.login({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
```

To run the live API tests, set the API key before executing the suite:

```bash
set REQRES_API_KEY=your_key_here
npm run test:api
```

## Supported methods

- `listUsers(page)`
- `getUser(userId)`
- `createUser(payload)`
- `updateUser(userId, payload)`
- `patchUser(userId, payload)`
- `deleteUser(userId)`
- `login(payload)`
- `register(payload)`
- `getResources()`
- `getSingleResource(resourceId)`
