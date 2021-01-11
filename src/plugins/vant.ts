import {
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Grid,
  GridItem,
  // Toast,
  // Dialog,
  Button,
  Swipe,
  SwipeItem
} from "vant"
import { createApp } from "vue"
// import 'vant/lib/cell/index.less';
// import 'vant/lib/grid/index.css'
// import 'vant/lib/grid-item/index.css'
// import 'vant/lib/toast/index.css'
// import 'vant/lib/dialog/index.css'

/**
 * @description 手动注册组件,达到按需加载目的
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app 整个应用的实例
 * @returns void
 */
export default function loadComponent(app: ReturnType<typeof createApp>) {
  app.use(Cell)
  app.use(CellGroup)
  app.use(Tab)
  app.use(Tabs)
  app.use(Grid)
  app.use(GridItem)
  // app.use(Toast)
  // app.use(Dialog)
  app.use(Button)
  app.use(Swipe)
  app.use(SwipeItem)
}