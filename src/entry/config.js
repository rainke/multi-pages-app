const layout = require('../html/layout.html');
const index = require('../html/index.html');
const more = require('../html/more.html');
const contact = require('../html/contact.html');
const none = require('../html/none.html');

const indexConfig = require('./config/index');
const moreConfig = require('./config/more');
const contactConfig = require('./config/contact');
const noneConfig = require('./config/none');

const config = {
  index: indexConfig,
  more: moreConfig,
  contact: contactConfig,
  none: noneConfig
};

const html = {
  layout,
  index,
  contact,
  none
};

module.exports = {
  config,
  html
};
