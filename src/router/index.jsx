// 导入路由相关组件
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
// lazy 路由懒加载
// Suspense 切换组件时 加载的过渡组件
import { lazy, Suspense } from 'react'
// 加载状态组件
import Loading from '@/components/Loading.jsx'
import Login from '@/views/login/Index.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'animate.css'
// 组件懒加载  加快首屏加载的速度
// const Login = lazy(() => import('@/views/login/Index.jsx'))
const Dashboard = lazy(() => import('@/views/dashboard/Index.jsx'))
// import Dashboard from '@/views/dashboard/Index.jsx'
const Routes = () => {
  // 软件工程 概念 耦合性  松耦合  可插拔式  函数职责的单一性
  const redirectByJWT = () => {
    // 1、token有效期
    // 时间戳为s
    const expire = localStorage.getItem('expire')
    // js生成时间戳 ms
    const timestamp = Math.floor(new Date().getTime() / 1000)
    if (timestamp - expire > 7200) {
      // token过期
      return <Redirect from="/" to="/login"></Redirect>
    } else {
      // 2、token是否存在
      if (localStorage.getItem('jwt')) {
        // token存在就跳转
        return <Redirect from="/" to="/dashboard/welcome"></Redirect>
      } else {
        return <Redirect from="/" to="/login"></Redirect>
      }
    }
  }
  // 获取路由参数信息
  const location = useLocation()
  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <TransitionGroup style={{ height: '100%' }}>
          <CSSTransition
            timeout={700}
            classNames={{
              // 进入时显示的效果
              // 自行写css动画或者使用css动画库
              enterActive: 'animate__animated animate__fadeIn',
              // 退出时显示的效果
              exitActive: 'animate__animated animate__fadeOut'
            }}
            // 通过key确定是否需要重新渲染
            key={location.pathname}
          > */}
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              {/* 根据用户是否登录 token有效性 确定/跳转到什么地方 */}
              {redirectByJWT()}
            </Switch>
          {/* </CSSTransition>
        </TransitionGroup> */}
      </Suspense>
    </>
  )
}

export default Routes
