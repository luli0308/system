import React, { Component } from 'react'
import * as echarts from 'echarts'
import bg from '../../assets/img/welcome.jpg'
/****
 *   实现地图图表标识
 *   1、地图数据  经纬度 及其范围
 *   2、使用图表的库  根据地图数据 生成图表
 *   3、数据标识
 *
 *   地图标识高校分布情况
 */
export default class Index extends Component {
  state = {
    list: []
  }
  loadData() {
    fetch('https://api.i-lynn.cn/college')
      .then((res) => res.json())
      .then((res) => {
        let list = res.data.list
        let tmp = []
        list.forEach((item) => {
          let obj = {}
          obj.name = item.area
          obj.value = item.counts
          tmp.push(obj)
        })
        this.setState({ list: tmp }, () => {
          this.loadMap()
        })
      })
  }
  loadMap = () => {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option
    myChart.showLoading()
    // fetch('/api/data/asset/geo/HK.json')
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then((res) => res.json())
      .then((geoJson) => {
        myChart.hideLoading()
        echarts.registerMap('china', geoJson)
        myChart.setOption(
          (option = {
            title: {
              text: '全国高校分布情况',
              subtext: '数据来源:教育部'
            },
            tooltip: {
              trigger: 'item'
              // formatter: '{b}<br/>{c} (p / km2)'
            },
            // toolbox: {
            //   show: false,
            //   orient: 'vertical',
            //   left: 'right',
            //   top: 'center',
            //   feature: {
            //     dataView: { readOnly: false },
            //     restore: {},
            //     saveAsImage: {}
            //   }
            // },
            visualMap: {
              min: 10,
              max: 150,
              text: ['High', 'Low'],
              realtime: false,
              calculable: true,
              inRange: {
                color: ['#f120e3', '#083cf7', '#06f937']
              }
            },
            series: [
              {
                name: '高校分布',
                type: 'map',
                map: 'china',
                label: {
                  // show: true
                },
                data: [...this.state.list,{name:'台湾省',value:171}]
                // 自定义名称映射
                // nameMap: {
                //   'Central and Western': '中西区',
                //   Eastern: '东区',
                //   Islands: '离岛',
                //   'Kowloon City': '九龙城',
                //   'Kwai Tsing': '葵青',
                //   'Kwun Tong': '观塘',
                //   North: '北区',
                //   'Sai Kung': '西贡',
                //   'Sha Tin': '沙田',
                //   'Sham Shui Po': '深水埗',
                //   Southern: '南区',
                //   'Tai Po': '大埔',
                //   'Tsuen Wan': '荃湾',
                //   'Tuen Mun': '屯门',
                //   'Wan Chai': '湾仔',
                //   'Wong Tai Sin': '黄大仙',
                //   'Yau Tsim Mong': '油尖旺',
                //   'Yuen Long': '元朗'
                // }
              }
            ]
          })
        )
      })
    option && myChart.setOption(option)
  }
  componentDidMount() {
    this.loadData()
  }
  render() {
    return (
      <div
        id="main"
        style={{ width: '100%', height: '100%'}}
        // style={{ width: '100%', height: '100%', backgroundImage: `url(${bg})` }}
      ></div>
    )
  }
}
