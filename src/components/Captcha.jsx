import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import PTS from 'prop-types'
export default function Captcha(props) {
  // console.log(props);
  const [img, setImg] = useState('')
  const dispatch = useDispatch()
  const load = () => {
    // console.log(props.children)
    axios.get('https://reactapi.iynn.cn/captcha/api/math').then((res) => {
      // console.log(res)
      const { img, key } = res.data
      setImg(img)
      // 将验证码需要校验的key 存储到redux创建store
      dispatch({ type: 'saveCaptchaKey', payload: key })
      // props.children(key)
    })
  }
  useEffect(() => {
    load()
    // props.load 父组件传给子组件的方法  load 是子组件调用加载验证码的方法
    props.load(load)
    return () => {}
  }, [])

  const { height, width } = props
  return (
    <div>
      <img
        src={img}
        alt=""
        height={height}
        width={width}
        onClick={load}
        style={{ cursor: 'pointer', boxShadow: '0px 0px 10px #40a9ff' }}
      />
    </div>
  )
}
Captcha.propsTypes = {
  height: PTS.string,
  width: PTS.string
}
Captcha.defaultProps = {
  width: '150',
  height: '40'
}
