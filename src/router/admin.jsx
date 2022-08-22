// 导入路由相关组件
import { Switch, Route, Redirect,useLocation } from 'react-router-dom'
// lazy 路由懒加载
// Suspense 切换组件时 加载的过渡组件
import { lazy, Suspense } from 'react'
// 加载状态组件
import Loading from '@/components/Loading.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'animate.css'
// 组件懒加载  加快首屏加载的速度
// const Login = lazy(() => import('@/views/login/Index.jsx'))
const Welcome = lazy(() => import('@/views/dashboard/Welcome.jsx'))
const User = lazy(() => import('@/views/user/Index.jsx'))
const Film = lazy(() => import('@/views/dashboard/film/Index.jsx'))
const Cinema = lazy(() => import('@/views/cinema/Index.jsx'))
const College = lazy(() => import('@/views/college/Index.jsx'))

const Routes = () => {
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
              <Route path="/dashboard/welcome" component={Welcome}></Route>
              <Route path="/dashboard/user" component={User}></Route>
              <Route path="/dashboard/film" component={Film}></Route>
              <Route path="/dashboard/cinema" component={Cinema}></Route>
              <Route path="/dashboard/college" component={College}></Route>
              <Redirect from="/dashboard" to="/dashboard/welcome"></Redirect>
            </Switch>
          {/* </CSSTransition>
        </TransitionGroup> */}
      </Suspense>
    </>
  )
}

export default Routes
