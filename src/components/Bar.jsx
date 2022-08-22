import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import PTS from 'prop-types'
export default function Bar(props) {
  // x 横轴数据
  const data1 = []
  // y 数轴数据
  const data2 = []
  props.data.forEach((item) => {
    data1.push(item.name)
    data2.push(item.value)
  })
  const load = () => {
    var chartDom = document.getElementById(props.id)
    var myChart = echarts.init(chartDom)
    var option

    option = {
      xAxis: {
        type: 'category',
        data: data1,
        axisLabel: {
          // show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          // show: true,
          textStyle: {
            color: '#ffffff'
          }
        }
      },
      series: [
        {
          data: data2,
          type: 'bar',
          showBackground: true,
          color: '#ff3318',
          backgroundStyle: {
            color: 'rgba(196, 8, 8, 0.2)'
          }
        }
      ]
    }

    option && myChart.setOption(option)
  }
  useEffect(() => {
    load()
    return () => {}
  }, [])

  return (
    <div
      id={props.id}
      style={{ width: '100%', height: '100%', border: '1px dashed gray' }}
    ></div>
  )
}
Bar.propTypes = {
  data: PTS.array.isRequired,
  id: PTS.string.isRequired
}
