const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the HTML file
const htmlPath = path.join(__dirname, 's3', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the API_URL placeholder with the actual value
const apiUrl = process.env.API_URL;
if (!apiUrl) {
  console.error('API_URL not found in .env file');
  process.exit(1);
}

html = html.replace("const API_URL = 'YOUR_API_URL_HERE';", `const API_URL = '${apiUrl}';`);

// Write the modified HTML to a new file
const outputPath = path.join(__dirname, 's3', 'index.prod.html');
fs.writeFileSync(outputPath, html);

console.log('Build completed successfully!'); 