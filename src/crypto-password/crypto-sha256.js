// Create a hashPassword(password) function that returns a SHA-256 hash

const crypto = require('crypto');


const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};


const password = 'myPassword678';
const hashedPassword = hashPassword(password);
console.log('SHA-256 хеш пароля:', hashedPassword);
