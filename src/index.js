import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
// 引入antd的样式
import 'antd/dist/antd.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
// 本地化语言包
import zhCN from 'antd/es/locale/zh_CN'
import ConfigProvider from 'antd/es/config-provider'
import store from './store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>

  // {/* </React.StrictMode> */}
)
