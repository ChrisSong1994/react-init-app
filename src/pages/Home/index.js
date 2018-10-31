import React, { Component } from 'react';
import api_article from 'api/article'

export default class Home extends Component {

    componentDidMount() {
        api_article.getArticleById('1540911110892').then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                this is homekljl
            </div>
        )
    }
}
