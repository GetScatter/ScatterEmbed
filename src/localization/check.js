// This script checks that all language file keys match those of `en.js`
// Run me: `node src/localization/check.js`

const fs = require('fs');
const path = require('path');

const languages = fs.readdirSync(__dirname + '/languages').filter(x => x!=='index.js').filter(x => x!== 'en.js');


const loadFile = filename => {
	let f = fs.readFileSync(__dirname+'/languages/'+filename, {encoding:'utf8'});
	f = f.replace('export default', 'module.exports =');
	return eval(f);
};

const en = loadFile('en.js');

const checkKeys = (original, toCheck) => {
	return Object.keys(original).map(key => {
		if(typeof original[key] !== typeof toCheck[key]) return console.error('Bad key type', key, typeof original[key], typeof toCheck[key]);
		if(typeof original[key] !== 'string') return checkKeys(original[key], toCheck[key]);
		return true;
	}).every(x => !!x);
};

languages.map(filename => {
	console.log('Checking: ', filename)
	if(!checkKeys(en, loadFile(filename))) console.error('Error in: ', filename);
});
