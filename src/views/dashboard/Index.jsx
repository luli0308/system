import React, { Component } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  QuestionCircleOutlined,
  AreaChartOutlined,
  FireOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, Popconfirm, message, Modal } from 'antd'
import '../../assets/css/layout.scss'
// 导入的嵌套路由配置
import Routes from '../../router/admin'
import url from '../../config/url'
import req from '../../http/req'
const { Header, Sider, Content, Footer } = Layout

export default class Index extends Component {
  state = {
    // 是否折叠左侧菜单
    collapsed: false,
    isFullScreen: false,
    accountInfo: {
      last_login_addr: {}
    },
    items: [
      {
        key: '1',
        icon: <UserOutlined />,
        label: '控制台首页',
        // 箭头函数this保持
        onClick: () => {
          this.props.history.push('/dashboard/welcome')
        }
      },
      {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: '用户管理',
        onClick: () => {
          this.props.history.push('/dashboard/user')
        }
      },
      {
        key: '3',
        icon: <UploadOutlined />,
        label: '订单管理'
      }
    ]
  }
  icons = [
    <AreaChartOutlined />,
    <UserOutlined />,
    <VideoCameraOutlined />,
    <UploadOutlined />,
    <FireOutlined />
  ]
  componentDidMount() {
    this.getAccountInfo()
  }
  getAccountInfo = () => {
    req.get(url.AccountInfo).then((res) => {
      // console.log(res)
      if (res.data.errNo === 0) {
        this.setState({ accountInfo: res.data.accountInfo })
        // 登录信息获取成功 处理显示菜单
        this.parseItems()
      } else {
        // 获取不到用户信息  token不合法[过期或者被篡改]
        localStorage.removeItem('acl')
        localStorage.removeItem('expire')
        localStorage.removeItem('jwt')
        message.success('请重新登录', 1, () => {
          this.props.history.replace('/login')
        })
      }
    })
  }
  // 获取菜单并处理菜单数据
  parseItems = () => {
    let acl = JSON.parse(localStorage.getItem('acl'))
    // console.log(acl)
    let items = []
    acl.forEach((item, index) => {
      if (item.is_nav === 1) {
        let obj = {}
        obj.key = item.auth_path
        obj.icon = <UserOutlined />
        obj.label = item.auth_name
        obj.icon = this.icons[index]
        // 判断是否具有子菜单
        if (item.children.length != 0) {
          obj.children = []
          item.children.forEach((item1) => {
            if (item1.is_nav === 1) {
              let obj1 = {}
              obj1.key = item1.auth_path
              obj1.icon = <UserOutlined />
              obj1.label = item1.auth_name
              obj1.icon = this.icons[index]
              obj1.onClick = () => {
                this.props.history.push(item1.auth_path)
              }
              obj.children.push(obj1)
            }
          })
        } else {
          // 如果是一级菜单 具有跳转
          obj.onClick = () => {
            this.props.history.push(item.auth_path)
          }
        }
        items.push(obj)
      }
    })
    // console.log(items)
    this.setState({ items })
  }
  logout = () => {
    // 退出清空存储在本地的用户信息 acl jwt expire
    // console.log('退出登录');
    localStorage.removeItem('acl')
    localStorage.removeItem('expire')
    localStorage.removeItem('jwt')
    message.success('注销成功', 1, () => {
      this.props.history.replace('/login')
    })
  }
  // logout = () => {
  //   // 退出清空存储在本地的用户信息 acl jwt expire
  //   // console.log('退出登录');
  //   Modal.confirm({
  //     title: '退出登录',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '不在留一会儿吗?',
  //     okText: '确认',
  //     cancelText: '取消',
  //     onOk: () => {
  //       localStorage.removeItem('acl')
  //       localStorage.removeItem('expire')
  //       localStorage.removeItem('jwt')
  //       message.success('注销成功', 1, () => {
  //         this.props.history.replace('/login')
  //       })
  //     }
  //   })
  // }
  render() {
    const { collapsed, isFullScreen, items } = this.state
    const { username, role, last_ip, last_login_addr } = this.state.accountInfo
    // console.log(this.props)
    let pathname = this.props.location.pathname
    const defaultSelectedKeys = [pathname]
    // 找到最后一个/的下标 截取到它
    let index = pathname.lastIndexOf('/')
    // console.log(pathname.slice(0, index))
    const defaultOpenKeys = [pathname.slice(0, index)]
    return (
      <>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div
              className="logo"
              onClick={() => this.props.history.push('/dashboard/welcome')}
            />
            <Menu
              theme="dark"
              mode="inline"
              // 默认选中的key
              defaultSelectedKeys={defaultSelectedKeys}
              // 默认打开的子菜单
              defaultOpenKeys={defaultOpenKeys}
              items={items}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0
              }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: () => this.setState({ collapsed: !collapsed })
                }
              )}
              <span>
                欢迎<span style={{ fontWeight: 'bold' }}>{username}</span>(
                {role})登录系统,上次于{last_login_addr.state}/
                {last_login_addr.isp}【{last_ip}】
                <Popconfirm
                  title="退出登录吗？"
                  okText="是"
                  cancelText="否"
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: 'red'
                      }}
                    />
                  }
                  onConfirm={this.logout}
                >
                  <Button type="primary">注销</Button>
                </Popconfirm>
                {React.createElement(
                  isFullScreen ? FullscreenExitOutlined : FullscreenOutlined,
                  {
                    className: 'trigger',
                    onClick: () => {
                      this.setState({ isFullScreen: !isFullScreen }, () => {
                        const element = document.documentElement
                        if (this.state.isFullScreen) {
                          if (element.requestFullscreen) {
                            element.requestFullscreen()
                          } else if (element.webkitRequestFullScreen) {
                            element.webkitRequestFullScreen()
                          } else if (element.mozRequestFullScreen) {
                            element.mozRequestFullScreen()
                          } else if (element.msRequestFullscreen) {
                            element.msRequestFullscreen()
                          }
                        } else {
                          if (document.exitFullscreen) {
                            document.exitFullscreen()
                          } else if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen()
                          } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen()
                          } else if (document.msExitFullscreen) {
                            document.msExitFullscreen()
                          }
                        }
                      })
                    }
                  }
                )}
                {/* <Button type="primary" onClick={this.logout}>
                  注销
                </Button> */}
              </span>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280
              }}
            >
              <Routes></Routes>
            </Content>
            <Footer
              style={{
                textAlign: 'center'
              }}
            >
              Ant Design ©2022 Created by HTML2202 太原
            </Footer>
          </Layout>
        </Layout>
      </>
    )
  }
}
