// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'vuex HomePage tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const url = browser.globals.devServerURL + '/vuex'

    browser
      .url(url)
      .waitForElementVisible('.vuex-home', 5000)
      .assert.elementPresent('.hello-message')
      .assert.containsText('.hello-message', 'Hello, guest')
      .end()
  }
}
