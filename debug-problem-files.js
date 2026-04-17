import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = ['clone_craft.xlsx', 'treasure_trail.xlsx'];

for (const fileName of files) {
  console.log(`\n\n========== ${fileName.toUpperCase()} ==========`);
  
  try {
    const filePath = path.join(__dirname, 'public/certificate', fileName);
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    console.log('Range:', range);
    console.log('Total rows:', range.e.r + 1);
    console.log('Total columns:', range.e.c + 1);
    
    // Print header row
    console.log('\nHEADER ROW (Row 0):');
    for (let col = 0; col <= Math.min(15, range.e.c); col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      const cell = worksheet[cellRef];
      const colLetter = String.fromCharCode(65 + col);
      console.log(`  ${colLetter}(${col}): "${cell?.v || '[empty]'}"`);
    }
    
    // Print first 5 data rows
    console.log('\nFIRST 5 DATA ROWS:');
    for (let row = 1; row <= Math.min(5, range.e.r); row++) {
      console.log(`\nRow ${row}:`);
      for (let col = 0; col <= Math.min(10, range.e.c); col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellRef];
        const colLetter = String.fromCharCode(65 + col);
        console.log(`  ${colLetter}(${col}): "${cell?.v || '[empty]'}"`);
      }
    }
    
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error.message);
  }
}
