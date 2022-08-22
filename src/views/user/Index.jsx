import React, { Component } from 'react'
import {
  PageHeader,
  Button,
  Table,
  Tag,
  Pagination,
  Space,
  message
} from 'antd'
import url from '../../config/url'
import req from '../../http/req'
export default class Index extends Component {
  state = {
    paginate: {}
  }
  componentDidMount() {
    this.load()
  }
  // dataSource = [
  //   {
  //     email: 'w7g@gmail.com',
  //     gender: '1',
  //     id: 1,
  //     mobile: '17600345345',
  //     status: '2',
  //     username: 'sunlao阿斯顿发放'
  //   }
  // ]

  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      render: (text, record, index) => {
        //  tom3326@qq.com
        // 字符数字开头取1位
        return text.replace(
          /([A-Za-z\d]{1})\w{2,}(@[A-Za-z\d]{2,}\.[A-Za-z]{2,})/,
          '$1****$2'
        )
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
      render: (text, record, index) => {
        return text.slice(0, 3) + '****' + text.slice(7, 11)
        // return text.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
      }
    },
    {
      // 列名称
      title: '性别',
      // 所对应的数据的key
      dataIndex: 'gender',
      align: 'center',
      render: (text, record, index) => {
        // console.log(typeof text);
        switch (text) {
          case '1':
            return <Tag color="blue">男</Tag>
          case '2':
            return <Tag color="pink">女</Tag>
          default:
            return <Tag color="green">保密</Tag>
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text, record, index) => {
        // console.log(typeof text);
        return text === '1' ? (
          <Tag color="#87d068">启用</Tag>
        ) : (
          <Tag color="#f50">禁用</Tag>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button type="primary">修改</Button>
            <Button type="danger" onClick={this.del.bind(this, record.id)}>
              禁用
            </Button>
          </Space>
        )
      }
    }
  ]
  del(id) {
    console.log(id)
    // req.delete(url.UserDel+'/'+id)
    req.delete(`${url.UserDel}/${id}`).then((res) => {
      // console.log(res)
      if (res.data.errNo === 0) {
        message.success('禁用成功')
        this.load(this.state.paginate.current_page)
        // 禁用完成后 修改对应数据
        // this.state.paginate.data.forEach((item) => {
        //   if (item.id === id) {
        //     item.status = 2
        //   }
        // })
        // console.log(this.state.paginate)
        // 设置state并渲染页面
        // this.setState({ paginate: this.state.paginate })
        // this.forceUpdate()
      } else {
        message.success('禁用失败')
      }
    })
  }
  render() {
    const { columns } = this
    return (
      <div>
        <PageHeader
          title="用户管理列表"
          subTitle="以简洁直观的方式展示本站的用户数据"
          extra={[
            <Button key="1" type="primary">
              添加用户
            </Button>
          ]}
        ></PageHeader>
        {/* rowKey 每一项的唯一值 */}
        <Table
          rowKey={(row) => row.id}
          dataSource={this.state.paginate.data}
          columns={columns}
          // 关闭分页
          pagination={false}
        />
        {/* 使用分页组件进行配置 */}
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
        >
          <Pagination
            current={this.state.paginate.current_page}
            onChange={this.load}
            total={this.state.paginate.total}
          />
        </div>
        {/* 
           数据分页
           一次性获取数据  展示到页面   造成渲染卡顿  流畅度不高
           需要对数据进行分批加载显示
           分页的实现方式:
           前端分页
             特点:数据一次性返回,分批渲染,通过截取数组的方式
           服务端分页
             特点:数据分批返回,通过参数传递的方式,获取不同的页的数据
            
           优缺点：
             前端分页:分页无需后端参与,一次获取的数据量大,加载慢
             后端分页:分批请求加载数据,请求更快,需要多次请求,服务端需要配合
                    通过参数获取数据库的数据
                    sql
                    select * from list; 获取所有数据
                    limit 截取
                    select * from list limit 0,9
                    select * from list limit 10,19

                    取一批数据 通过数组截取的方式
        
        */}
      </div>
    )
  }
  // 获取分页数据
  load = (page) => {
    // console.log(page)
    // 首次加载时没有page传递 为undefined 就赋值为1
    // 后续通过翻页按钮加载传递了 需要加载的页码 直接赋值给对应page即可
    page = page ? page : 1
    req.get(url.UserList, { params: { page } }).then((res) => {
      console.log(res)
      this.setState({ paginate: res.data.paginate })
    })
  }
}
