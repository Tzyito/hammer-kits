import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    console.log('Hello content.')
    const app = createApp(App)
    const el = document.createElement('div')
    el.id = 'wxt-vue-content'
    document.body.appendChild(el)
    app.mount(el)
    return () => {
      app.unmount()
    }
  },
})
