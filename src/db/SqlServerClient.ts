import { execFileSync } from 'node:child_process';

export class SqlServerClient {
  private readonly server = process.env.SQL_SERVER ?? 'DESKTOP-CTNIRRU';
  private readonly database = process.env.SQL_DATABASE ?? 'employeeInfo';

  select(query: string): string[] {
    const statement = query.trim().replace(/;\s*$/, '');
    if (
      !/^SELECT\b/i.test(statement) ||
      /[;]/.test(statement) ||
      /--|\/\*/.test(statement) ||
      /\bINTO\b/i.test(statement)
    ) {
      throw new Error('Only a single SELECT query is allowed.');
    }

    const output = execFileSync(
      'sqlcmd',
      [
        '-S', this.server,
        '-d', this.database,
        '-E',
        '-b',
        '-h', '-1',
        '-W',
        '-Q', `SET NOCOUNT ON;\n${statement}`,
      ],
      {
        encoding: 'utf8',
        timeout: 30_000,
        windowsHide: true,
      },
    );

    return output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
}
