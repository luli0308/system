import React, { Component } from 'react'
import { Carousel, PageHeader } from 'antd'
import Pie from '../../components/Pie'
import Bar from '../../components/Bar'
import Line from '../../components/Line'
/***
 *  发请求
 *  拿数据
 *  存本地
 *  做展示
 */
import url from '../../config/url'
import req from '../../http/req'
import '@/assets/css/welcome.scss'
export default class Welcome extends Component {
  contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#1890ff'
  }
  state = {
    data: null
  }
  componentDidMount() {
    req.get(url.UserData).then((res) => {
      console.log(res)
      if (res.data.errNo === 0) {
        this.setState({ data: res.data.data })
      }
    })
  }
  render() {
    if (this.state.data != null) {
      const { contentStyle } = this
      const { gender, accessFrom, area } = this.state.data
      // console.log(gender)
      /***
       *  字符串''和数字0 判断为fasle
       *  {} null 判断为true
       *
       *
       */
      // console.log(''==false);
      // console.log(0==false);
      // console.log({}==false);
      // console.log(null==false);
      // console.log(this.state.data)
      return (
        <div>
          <PageHeader
            title="管理平台数据展示"
            subTitle="以统计图的方式展示平台运营数据"
          ></PageHeader>
          <Carousel autoplay effect="fade">
            <div>
              <h3 style={contentStyle}>新注册数:328人</h3>
            </div>
            <div>
              <h3 style={contentStyle}>昨日活跃用户:1560</h3>
            </div>
            <div>
              <h3 style={contentStyle}>访问量:18603次</h3>
            </div>
            <div>
              <h3 style={contentStyle}>来源渠道:5个</h3>
            </div>
          </Carousel>
          <div style={{ height: 20, backgroundColor: '#fff' }}></div>
          <div className="welcome">
            <div style={{ display: 'flex', height: 450 }}>
              <Pie data={gender} id="pie1" text="用户性别分布"></Pie>
              <Pie data={accessFrom} id="pie2" text="用户来源分布"></Pie>
              <Pie data={area} id="pie3" text="用户地区分布"></Pie>
            </div>
            <div style={{ display: 'flex', height: 450 }}>
              <Bar data={gender} id="bar1"></Bar>
              <Bar data={accessFrom} id="bar2"></Bar>
              <Bar data={area} id="bar3"></Bar>
            </div>
            <div style={{ display: 'flex', height: 450 }}>
              <Line data={gender} id="line1"></Line>
              <Line data={accessFrom} id="line2"></Line>
              <Line data={area} id="line3"></Line>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
