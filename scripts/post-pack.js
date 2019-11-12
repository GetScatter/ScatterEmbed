const fs = require('fs');
require('dotenv').config();

console.log('done building')

if(!fs.existsSync('./dist')) return;

fs.writeFileSync(`./dist/min.version`, process.env.MIN_CONTAINER_VERSION);
