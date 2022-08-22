## 项目使用
```shell
# 克隆项目
git clone git@gitee.com:jsy135135/react2202.git

# 安装依赖
npm i

# 运行项目
npm start 
```

## 技术栈
- react：主框架

- react-router-dom：路由包

- redux：大规模状态管理库

- react-redux：给redux做强化

- redux-thunk：reudx的异步库
- **immutable：不可变数据**

- styled-components ：css-in-js技术的实现

- antd：前端组件库（ant design、antd mobile）

- **react-transition-group ：过渡动画**

- axios：网络请求库

## 项目功能模块
登录模块
1、基于jwt方式实现客户端登录
   0.验证码
     图形验证码服务端生成和校验
     发送验证码获取请求给服务端,img图片地址(url|base64)、key(验证码的唯一标识,后续验证需要进行识别将要校验的验证码是哪一个)
   ①在客户端收集用户名称和密码 通过请求服务端接口 接收返回的参数信息
   ②如果接口返回登录成功,将返回的数据进行存储
    1) token 字符串包含存储了用户一些非敏感  jwt
    2) token 具有有效期  7200s  expire
    3) acl 获取当前用户的菜单列表
![登录页面](./demo/%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2.png)

2、后台管理界面
   基于antd布局页面结构,左侧为功能菜单。右侧为主显示部分和页脚版权信息。
   layout布局
   https://ant-design.gitee.io/components/layout-cn/#components-layout-demo-custom-trigger
![管理界面布局](./demo/%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2%E5%B8%83%E5%B1%80.png)