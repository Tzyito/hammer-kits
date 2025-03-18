import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/unocss'],
  runner: {
    chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
  },
  manifest: {
    // permissions: ['storage'],
    // host_permissions: ['*://*/*'],
  },
  unocss: {
    // excludeEntrypoints: ['background'],
  },
})
