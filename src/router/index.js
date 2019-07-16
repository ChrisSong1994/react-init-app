import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from 'src/pages/Home';
import List from 'src/pages/List'
import NotFound from 'src/pages/NotFound'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div >
                    <Link to="/home">首页</Link>
                    <Link to="/list">列表</Link>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/list" component={List} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default App;
