var crypto;
try {
    crypto = require('crypto').randomBytes(256).toString('hex');
} catch (err) {
    console.log('crypto support is disabled!');
}

module.exports = {
    apiUrl: 'http://localhost:3700',
    secret: crypto
}