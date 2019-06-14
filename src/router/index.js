import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

import Head from '../pages/Layout/Head/index.js'
import Home from '../pages/Home';
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
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Router>
        )
    }
}
// const getRouter = () => (
//   <Router>
//     <Layout>
//       <Head />
//       <Content style={{ padding: '0 50px', marginTop: 64 }}>
//         <Breadcrumb style={{ margin: '16px 0' }}>
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//         </Breadcrumb>
//         <div style={{ background: '#fff', padding: 24, minHeight: 1580 }}>
//           <Switch>
//             <Route exact path="/" component={Home} />
//           </Switch>
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>
//         Ant Design ©2018 Created by Ant UED
//     </Footer>
//     </Layout>
//   </Router>
// );
export default App;
