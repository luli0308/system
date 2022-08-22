import React, { Component } from 'react'
// 导入路由规则
import Routes from './router'
export default class App extends Component {
  render() {
    return (
      <>
        {/* 路由切换后渲染的位置 */}
        <Routes></Routes>
      </>
    )
  }
}
