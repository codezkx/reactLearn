import { useState, PureComponent, createRef } from 'react';

import Profile from './Profile'
import Clock from './Clock'

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.selectRef = createRef()
    this.state = { color: '', time: 0 };
  }

  getSelectValue() {
    const _color = this.selectRef.current.value
    this.setState({
      color: _color
    })
  }

  render () {
    setInterval(() => {
      this.setState(state => {
        console.log(state)
        return state.time = Date.now()
      })
    }, 1000)
    return (
      // 使用多个标签时需要用一个父元素包裹，其子组件或则子元素 
      <>
        {/* <Profile /> */}
        <Clock
          color={this.state.color}
        >
          <h1>{ this.state.time }</h1>
          <label htmlFor="clock"></label>
          <select
            name="clock"
            id="clock"
            onChange={() => this.getSelectValue()}
            ref={this.selectRef}
          >
            <option value="lightcoral">浅珊瑚色</option>
            <option value="midnightblue">午夜蓝</option>
            <option value="rebeccapurple">丽贝卡紫</option>
          </select>
        </Clock>
      </>
    );
  }
}

export default App