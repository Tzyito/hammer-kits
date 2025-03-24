import { defineConfig } from 'wxt'
import { resolve } from 'path'
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
    configOrPath: resolve(__dirname, './unocss.config.ts'),
  },
})
