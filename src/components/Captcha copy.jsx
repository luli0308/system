/***
 *  图片验证码
 *  1、在服务端生成 返回的方式是一张图片地址或者base64字符串
 *  2、客户端需要调用服务端接口生成验证码 并显示到页面上
 *  3、点击图片加载新的验证码
 *
 *  注意:验证码生成和校验都是在服务端
 *      生成一个唯一标识 key 后续到服务端校验需要传递key 以确认需要校验的是哪个验证码
 */

import React, { Component } from 'react'
import PTS from 'prop-types'
import axios from 'axios'
export default class Captcha extends Component {
  state = {
    img: '',
    key: ''
  }
  static propsTypes = {
    height: PTS.string,
    width: PTS.string
  }
  static defaultProps = {
    width: '150',
    height: '40',
  }
  componentDidMount() {
    this.load()
  }
  load() {
    axios.get('https://reactapi.iynn.cn/captcha/api/math').then((res) => {
      // console.log(res)
      const { img, key } = res.data
      this.setState({ img, key })
    })
  }
  render() {
    const { img } = this.state
    const {height,width} = this.props
    return (
      <div>
        <img
          src={img}
          alt=""
          onClick={() => this.load()}
          style={{ cursor: 'pointer' }}
          width={width}
          height={height}
        />
      </div>
    )
  }
}
