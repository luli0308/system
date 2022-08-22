/***
 *  什么样的数据适合存储到redux?
 *  全局使用数据
 *  函数编程中 建议将组件数据全部外置,函数组件只负责渲染,状态由redux管理
 *  通过redux创建store
 */
/****
 *  redux管理的数据 通过immutable进行管理
 *  1、redux combineReducers 替换为immutable combineReducers
 *  2、state的初始化的普通对象数据格式转为immutable fromjs对象
 *
 *
 */
import { legacy_createStore as createStore } from 'redux'
import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
const initState = fromJS({
  num: 100,
  obj: {
    count: 200
  },
  // 验证码需要进行校验的key 验证码的唯一值
  captcha: {
    key: ''
  }
})

function reducer(state = initState, action) {
  switch (action.type) {
    case 'add':
      // 此处{...state,xxx} 算浅拷贝
      // return { ...state, num: state.num + action.payload }
      return state.update('num', (val) => val + action.payload)
    case 'dec':
      return state.updateIn(['obj', 'count'], (val) => val - action.payload)
    case 'saveCaptchaKey':
      return state.updateIn(['captcha', 'key'], () => action.payload)
    default:
      return state
  }
}

export default createStore(
  // +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  combineReducers({ reducer }),
)
