import React, { Component } from 'react';
import { Tree, Button, Icon } from 'antd'
import { observer, inject } from "mobx-react"

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

@inject("globleStore")
@observer
class Home extends Component {
    constructor() {
        super()
        this.state = {
            treeData: [
                { key: '1', title: '第一部分', parentId: '-1' },
                { key: '1-1', title: '一、二级标题', parentId: '1' },
                { key: '1-2', title: '二、二级标题', parentId: '1' },
                { key: '1-3', title: '三、二级标题', parentId: '1' },
                { key: '1-4', title: '四、二级标题', parentId: '1' },
                { key: '2', title: '第二部分', parentId: '-1' },
                { key: '2-1', title: '一、二级标题', parentId: '2' },
                { key: '2-1-1', title: '（一）三级标题', parentId: '2-1' },
                { key: '2-1-2', title: '（二）三级标题', parentId: '2-1' },
                { key: '2-1-3', title: '（三）三级标题', parentId: '2-1' },
                { key: '2-2', title: '二、二级标题', parentId: '2' },
                { key: '2-2-1', title: '（一）三级标题', parentId: '2-2' },
                { key: '2-2-2', title: '（二）三级标题', parentId: '2-2' },
                { key: '2-3', title: '三、二级标题', parentId: '2' },
                { key: '2-3-1', title: '（一）三级标题', parentId: '2-3' },
                { key: '2-3-2', title: '（二）三级标题', parentId: '2-3' },
                { key: '2-4', title: '四、二级标题', parentId: '2' },
                { key: '2-4-1', title: '（一）三级标题', parentId: '2-4' },
                { key: '2-4-2', title: '（二）三级标题', parentId: '2-4' },
                { key: '2-5', title: '五、二级标题', parentId: '2' },
                { key: '2-5-1', title: '（一）三级标题', parentId: '2-5' },
                { key: '2-5-2', title: '（二）三级标题', parentId: '2-5' }
            ],
            selectPaths: []
        }
    }

    // 根据父级找到所有子级节点
    getByParentId(parentId) {
        return this.state.treeData.filter(item => {
            return item.parentId === parentId;
        })
    }

    renderTreeNode = (parentId) => {
        // 先找到子级节点
        let tmp = this.getByParentId(parentId);
        if (tmp.length > 0) {
            // 遍历铺页面，如果数组长度不为0则证明子级不为空
            return tmp.map(item => {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNode(item.key)}
                    </TreeNode>
                );
            })
        }
    }


    // 选择节点
    onSelect(data, option) {
        console.log('Trigger Select');
        console.log(data, option);
        this.setState({ selectPaths: data })
    };

    handleDelete() {

    }

    handleUpload() {
        const { treeData } = this.state
        treeData.push({ key: '1-5', title: '新增', parentId: '1' })
        this.setState({ treeData })
    }

    render() {
        const { background } = this.props.globleStore
        return (
            <div style={{ background }}>
                <DirectoryTree
                    multiple
                    onSelect={this.onSelect.bind(this)}
                >
                    {this.renderTreeNode("-1")}
                </DirectoryTree>

                <div>
                    <Button onClick={this.handleDelete.bind(this)}><Icon type="delete" />删除</Button>
                    <Button onClick={this.handleUpload.bind(this)}><Icon type={"cloud-upload"} />上传</Button>
                </div>
            </div>
        )
    }
}

export default Home