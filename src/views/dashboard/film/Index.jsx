import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Index extends Component {
  render() {
    // console.log(this.props);
    const { num,obj } = this.props.reducer
    return (
      <div>
        {/* <button onClick={this.props.add.bind(this,20)}>{num}</button> */}
        <button onClick={()=>this.props.add(20)}>{num}</button>
        <div>
          <button onClick={()=>this.props.dec(1)}>{obj.count}</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state.toJS());
  return state.toJS()
}

const mapDispatchToProps = (dispatch) => {
  return {
    add(payload) {
      dispatch({ type: 'add', payload})
    },
    dec(payload){
      dispatch({type:'dec',payload})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
