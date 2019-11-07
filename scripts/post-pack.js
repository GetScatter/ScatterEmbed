const fs = require('fs');
const ecc = require('eosjs-ecc');

console.log('done building')

if(!fs.existsSync('./dist')) return;

const files = fs.readdirSync('./dist').filter(x => x !== 'static');
console.log(files);

fs.writeFileSync('./dist/files.json', JSON.stringify(files));

fs.mkdirSync('./dist/hashes');

files.map(filename => {
	const hash = ecc.sha256(fs.readFileSync(`./dist/${filename}`, 'utf8'));
	const sig = 'SIG_K1_KiWzMFtwyvHMws46ZbhPN1bh8pUwWAfDb4usuGUUAEvweFLGeeq3BnFRQNCEAtZhJL9ZjPT7KPnYEMbNc48RBsf2jAxmA2';
	fs.writeFileSync(`./dist/hashes/${filename}.hash`, `${hash}|${sig}`);
});
