const fs = require('fs');
const ecc = require('eosjs-ecc');
require('dotenv').config();

if(!fs.existsSync('./dist')) return;

const files = fs.readdirSync('./dist').filter(x => x !== 'static');
fs.writeFileSync('./dist/files.json', JSON.stringify(files));

try { fs.mkdirSync('./dist/hashes'); } catch(e){}

files.map(filename => {
	const hash = ecc.sha256(fs.readFileSync(`./dist/${filename}`, 'utf8'));
	const sig = 'SIG_K1_KiWzMFtwyvHMws46ZbhPN1bh8pUwWAfDb4usuGUUAEvweFLGeeq3BnFRQNCEAtZhJL9ZjPT7KPnYEMbNc48RBsf2jAxmA2';
	fs.writeFileSync(`./dist/hashes/${filename}.hash`, `${hash}|${sig}`);
});
