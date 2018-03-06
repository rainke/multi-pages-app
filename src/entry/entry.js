const config = require('./config');
const escapeStringRegexp = require('escape-string-regexp');

/**
 * templateParams{compilation, webpack, webapckConfig, htmlWebpackPlugin}
 */
module.exports = function main(templateParams) {
  const { name } = templateParams.htmlWebpackPlugin.options;
  let { layout } = config.html;
  const mainHtml = config.html[name];
  const pageConf = config.config[name];

  layout = layout.replace('{{main}}', mainHtml);
  Object.keys(pageConf).forEach((key) => {
    const value = pageConf[key];
    layout = layout.replace(
      new RegExp(`{{${escapeStringRegexp(key)}}}`, 'g'),
      value
    );
  });
  // 导航栏激活项
  const activeRe = /{{active-(.*)}}/g;
  layout = layout.replace(activeRe, ($0, $1) => {
    if ($1 === name) {
      return 'active';
    }
    return '';
  });

  return layout;
};
