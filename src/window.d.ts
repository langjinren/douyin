import { createApp } from "vue"
const app: ReturnType<typeof createApp> = createApp(App)

declare global {
  declare interface Window {
    WebViewJavascriptBridge: any;
    WVJBCallbacks: any;
    jsObj: any;
  }
}
