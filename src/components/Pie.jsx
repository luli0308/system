import React, { Component } from 'react'
import * as echarts from 'echarts'
import PTS from 'prop-types'
/**
 *  通过echarts实现饼状图
 *
 *
 */
export default class Pie extends Component {
  static propTypes = {
    data: PTS.array.isRequired,
    id: PTS.string.isRequired,
    text: PTS.string.isRequired,
    subtext: PTS.string.isRequired
  }
  static defaultProps = {
    subtext: '数据来源:运营统计'
  }
  componentDidMount() {
    console.log(this.props)
    var chartDom = document.getElementById(this.props.id)
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        // show:false,
        text: this.props.text,
        subtext: this.props.subtext,
        left: 'center',
        textStyle: {
          color: '#fff'
        },
        subtextStyle: {
          color: '#fff'
        }
      },
      // 鼠标移动到图上元素时 显示的内容
      tooltip: {
        trigger: 'item',
        // 数据显示组件中数据的格式化操作  根据特定的结构显示数据
        formatter: '{b0}<br />{c0}人<br />占比:{d}%'
      },
      // 图示 图例
      legend: {
        // show: false,
        top: '10%',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.props.data
        }
      ]
    }

    option && myChart.setOption(option)
  }
  render() {
    // 多个图使用的id不能重复 在组件被调用时 传递唯一的id值
    return (
      <div
        id={this.props.id}
        style={{ width: '100%', height: '100%', border: '1px dashed gray' }}
      ></div>
    )
  }
}
