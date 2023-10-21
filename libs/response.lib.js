const { encrypt } = require('../libs/encrypt.lib');
const { security } = require('../config');
module.exports = {
  sendRequest: ({ error, message, data }) => {
    let reqData = {};
    if (!security.encrypt) {
      return { error, message, data };
    }
    try {
      reqData = encrypt({ error, message, data: JSON.stringify(data) });
    } catch (e) {
      reqData = encrypt({ error: true, message: '', data: {} });
    }
    return reqData;
  }
};
