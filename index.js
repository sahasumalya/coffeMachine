const inputLoad = require('./controllers/loadInput.js');
const fs = require('fs');
let inputJson = fs.readFileSync(process.argv[2]);
inputLoad(inputJson);
