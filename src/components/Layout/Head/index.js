import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import './style.scss';

class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: 'home'
    }
  }

  componentDidMount() {
    const path = this.props.match.path
    this.mathPath(path)
  }

  mathPath(path) {
    let selectedKey
    if (path.includes('home') || (path === '/')) { selectedKey = 'home' }
    if (path.includes('list')) { selectedKey = 'list' }
    this.setState({ selectedKey })
  }


  render() {
    const { selectedKey } = this.state
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ lineHeight: '64px' }}
          onSelect={(item) => {
            this.mathPath(item.key)
          }}>
          <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
          <Menu.Item key="list"><Link to="/list">列表</Link></Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default withRouter(Head) 
