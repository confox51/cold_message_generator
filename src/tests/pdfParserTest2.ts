const fs1 = require('fs');            // Using because import doesnt see fs as a module
const pdfParser = require('pdf-parse'); // Using because import doesnt see pdfParse as a module

// Main function definition that takes a file path and returns a Promise of string
async function analyzePDF(filePath: string): Promise<void> {
  try {
    const dataBuffer = fs1.readFileSync(filePath);
    const data = await pdfParser(dataBuffer);
    
    console.log('PDF Information:');
    console.log('-----------------');
    console.log(`Number of Pages: ${data.numpages}`);
    console.log(`PDF Information: ${data.info ? JSON.stringify(data.info, null, 2) : 'No info available'}`);
    console.log(`PDF Version: ${data.version}`);
    console.log(`PDF Metadata: ${data.metadata ? JSON.stringify(data.metadata, null, 2) : 'No metadata available'}`);
    console.log('-----------------');
    console.log('Text Content:');
    console.log(data.text);
  } catch (error: Error | any) {
    console.error('Error:', error.message);
  }
}

const pdfFilePath = process.argv[2];
if (!pdfFilePath) {
  console.log('Please provide a PDF file path.');
  console.log('Usage: ts-node pdfParserTest2.ts <path-to-pdf>');
  process.exit(1);
}

analyzePDF(pdfFilePath);