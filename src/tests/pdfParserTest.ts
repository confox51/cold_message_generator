// Import statements
// import fs from 'fs';              // Node.js built-in file system module for reading files
// import pdfParse from 'pdf-parse'; // The PDF parsing library we'll use

const fs = require('fs');            // Using because import doesnt see fs as a module
const pdfParse = require('pdf-parse'); // Using because import doesnt see pdfParse as a module

// Main function definition that takes a file path and returns a Promise of string
async function parsePDF(filePath: string): Promise<string> {
  try {
    // Read the PDF file into a buffer
    const dataBuffer = await fs.promises.readFile(filePath);
    
    // Parse the PDF buffer into text
    const data = await pdfParse(dataBuffer);
    
    // Return just the text content
    return data.text;
  } catch (error) {
    // If anything goes wrong (file not found, invalid PDF, etc.)
    console.error('Error parsing PDF:', error);
    process.exit(1); // Exit with error code
  }
}

// Get the PDF file path from command line arguments
// process.argv[0] is 'node'
// process.argv[1] is the script path
// process.argv[2] is the first actual argument (our PDF path)
const pdfPath = process.argv[2];

// Check if a file path was provided
if (!pdfPath) {
  console.log('Please provide a PDF file path as argument');
  console.log('Usage: ts-node pdfParserTest.ts <path-to-pdf>');
  process.exit(1); // Exit with error code if no path provided
}

// Call the parsePDF function with the provided path
parsePDF(pdfPath)
  .then(text => console.log(text))     // If successful, print the extracted text
  .catch(error => console.error(error)); // If failed, print the error

// pdf path: "C:/Users/scf75/Downloads/Sai Maddali Profile.pdf"