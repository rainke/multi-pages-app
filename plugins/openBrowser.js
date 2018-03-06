const execSync = require('child_process').execSync;

const openBrowser = (url) => {
  execSync('ps cax | grep "Google Chrome"');
  execSync(`osascript openChrome.applescript "${encodeURI(url)}"`, {
    cwd: __dirname,
    stdio: 'ignore'
  });
};

class OpenBrowserPlugin {
  constructor(options) {
    this.options = options;
    this.firstRun = true;
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      if (this.firstRun) {
        this.firstRun = false;
        openBrowser(`http://localhost:${this.options.port}`);
      }
    });
  }
}

module.exports = OpenBrowserPlugin;
