import React, { Component } from 'react';
import { observer, inject } from "mobx-react"

@inject("globleStore")
@observer
class Home extends Component {
    constructor() {
        super()
        this.state = {
            treeData: [
            ],
            selectPaths: []
        }
    }

    handleClick() {
        this.getComponent().then((element) => {
            document.body.appendChild(element)
        })
    }
    getComponent() {
        return import('lodash').then(({ default: _ }) => {
            let element = document.createElement('div')
            element.innerHTML = _.join(['a', 'b', 'c'], '***')
            return element
        })
    }
    render() {
        const { background } = this.props.globleStore
        return (
            <div style={{ background }}>
                <button onClick={this.handleClick.bind(this)}>异步加载</button>
            </div>
        )
    }
}

export default Home