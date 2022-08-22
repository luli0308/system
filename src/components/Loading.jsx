import { Spin } from 'antd'
import React from 'react'
import PTS from 'prop-types'
import styled from 'styled-components'
/***
 *   加载组件的状态显示在页面中间
 *   传递一些参数 展示不同的效果
 */
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`
export default function Loading(props) {
  return (
    <Main>
      <Spin tip={props.tip} size={props.size} spinning={props.spinning}></Spin>
    </Main>
  )
}
// prop类型约束
Loading.propTypes = {
  tip: PTS.string,
  size: PTS.string,
  spinning: PTS.bool
}
// 默认值
Loading.defaultProps = {
  tip: '加载中...',
  size: 'large',
  spinning: true
}
