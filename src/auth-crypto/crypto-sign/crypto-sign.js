const crypto = require('crypto');

function createSignature(data, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  sign.end();
  return sign.sign(privateKey, 'hex');
}

function verifySignature(data, signature, publicKey) {
  const verify = crypto.createVerify('SHA256');
  verify.update(data);
  verify.end();
  return verify.verify(publicKey, signature, 'hex');
}

// RSA generate
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048});

const data = 'Data that will be signed';
const signature = createSignature(data, privateKey);
console.log('Digital signature:', signature);

const isValid = verifySignature(data, signature, publicKey);
console.log('Signature valid:', isValid);
