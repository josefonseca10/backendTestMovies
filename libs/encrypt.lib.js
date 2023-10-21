const CryptoJS = require('crypto-js');
const { security } = require('../config/index');
module.exports = {
  encrypt: (data) => {
    let encText = '';
    if (typeof data === 'object') {
      encText = JSON.stringify(data);
    } else {
      encText = data + '';
    }
    return CryptoJS.AES.encrypt(encText, security.digest).toString();
  },
  decrypt: (data) => {
    const bytes = CryptoJS.AES.decrypt(data, security.digest);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};
