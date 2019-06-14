import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class Foot extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                React-Init-App ©2019 Created by Chris Song
            </Footer>
        )
    }
}

export default Foot
