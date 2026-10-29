import 'dotenv/config';
import { test, expect } from '@playwright/test';
import { SqlServerClient } from '../src/db/SqlServerClient';

test('returns the employee with epmID 1', () => {
  const rows = new SqlServerClient().select('select empName from employees  where epmID=1');

  console.log(rows.length)
  console.log(rows)
  expect(rows.length).toBeGreaterThan(0);
  expect(rows).toContain('deepak dara')
});
