import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import Foot from 'components/Layout/Foot'
import Head from 'components/Layout/Head'
import Home from 'pages/Home';
import List from 'pages/List'
import NotFound from 'pages/NotFound'

const { Content } = Layout;
class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Head />
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 1580 }}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/home" component={Home} />
                                <Route path="/list" component={List} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Content>
                    <Foot />
                </Layout>
            </Router>
        )
    }
}

export default App;
