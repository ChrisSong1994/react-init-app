import React from "react";
import ReactDOM from 'react-dom';
import './assets/style/index.scss'; // 引入css
import 'antd/dist/antd.css';
import App from './router';
import { Provider } from "mobx-react"
import { stores } from "./store"
/* 初始化 */

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
