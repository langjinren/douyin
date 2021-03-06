import { createApp } from "vue"

/**
 * @description 加载所有Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = require.context('.', true, /\.ts$/)
  files.keys().forEach((key) => {
    if (key !== './index.ts') files(key).default(app)
  })
}