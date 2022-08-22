import React, { Component } from 'react'
import { Form, Input, Button, Space, message } from 'antd'
import { LockOutlined, UserOutlined, InsuranceTwoTone } from '@ant-design/icons'
import Captcha from '../../components/Captcha'
import url from '../../config/url'
import req from '../../http/req'
import { withRouter } from 'react-router-dom'
import { createRef } from 'react'
import { connect } from 'react-redux'
class PasswordLogin extends Component {
  state = {
    key: ''
  }
  ref1 = createRef()
  // 表单提交收集表单数据
  onFinish = (values) => {
    console.log(this.props)
    values.key = this.props.reducer.captcha.key
    console.log(values)
    // 管理账号  admin  123456
    req.post(url.Login, values).then((res) => {
      console.log(res)
      if (res.data.errNo === 0) {
        // message.success(提示文本,显示时长,关闭后回到执行)
        message.success('登录成功', 1, () => {
          this.props.history.push('/dashboard/welcome')
        })
      } else {
        // let str = ''
        // map映射的方式
        let tmp = {
          100001: res.data.errText,
          100004: '用户名或者密码错误'
        }
        // if (res.data.errNo === 100001) {
        //   str = res.data.errText
        // }
        // if (res.data.errNo === 100004) {
        //   str = '用户名或者密码错误'
        // }
        message.error(tmp[res.data.errNo], 1, () => {
          // 页面重新加载
          // window.location.reload()
          // 刷新验证码
          this.load()
          // 清空表单元素
          // console.log(this);
          // console.log(this.ref1);
          this.ref1.current.resetFields()
        })
      }
    })
  }
  // 父组件定义一个方法  传递给子组件
  getKey = (key) => {
    this.setState({ key })
  }
  load = () => {}
  // 父传子方法  子调用方法 返回子的方法
  getLoadByCaptcha = (load) => {
    this.load = load
  }
  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        onFinish={this.onFinish}
        size="large"
        ref={this.ref1}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            },
            {
              min: 6,
              message: '密码长度6位以上'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码'
            }
          ]}
        >
          <Space>
            <Input
              prefix={<InsuranceTwoTone className="site-form-item-icon" />}
              placeholder="验证码"
            />
            <Captcha load={this.getLoadByCaptcha}>{this.getKey}</Captcha>
          </Space>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
const mapStateToProps = (state) => {
  return state.toJS()
}
// 使用Hoc高阶组件withRouter 是组件获取到路由相关信息
export default withRouter(connect(mapStateToProps)(PasswordLogin))
