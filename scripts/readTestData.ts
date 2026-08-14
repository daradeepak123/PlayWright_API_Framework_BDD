import * as xlsx from 'xlsx';
import path from 'path';

const file = path.join(process.cwd(), 'src', 'testData', 'TestDataReading.xlsx');

try {
  const workbook = xlsx.readFile(file);
  workbook.SheetNames.forEach((sheetName: string) => {
    const worksheet = workbook.Sheets[sheetName];
    const json: any[] = xlsx.utils.sheet_to_json(worksheet, { defval: '' });
    console.log(`\nSheet: ${sheetName} (${json.length} rows)`);
    if (json.length === 0) {
      console.log('(empty)');
      return;
    }
    console.table(json);
  });
} catch (err: any) {
  console.error('Failed to read Excel file:', err?.message || err);
  process.exit(1);
}
