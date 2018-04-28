const profile = require('./profile.js');

//const users = ['anujsachdeva2', 'chalkers', 'anujsachdeva'];
const users = process.argv.slice(2);

users.map(profile.get);



