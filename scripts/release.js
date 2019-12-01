require('dotenv').config();
const childProcess = require('child_process');

const quit = msg => {
	console.error(msg);
	process.exit(0);
};

if(process.env.NO_WALLET) return quit('NO_WALLET is enabled');

const run = (cmd, callback = () => {}) => {
	console.log('running: ', cmd)

	const p = childProcess.exec(cmd);
	p.stdout.on('data', ( data ) => console.log(data));
	p.stderr.on('data', ( data ) => console.log(data));
	p.on('error', function (err) { console.error(err); });
	p.on('exit', function (code) { console.log('exited', code); callback(); });
}

run(`yarn install`, () => {
	run(`webpack -p --mode=production --progress --config build/webpack.config.prod.js`);
})
