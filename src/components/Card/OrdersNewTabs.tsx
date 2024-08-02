import React, { Component } from 'react';
import { Button, Modal, Input } from 'antd';
import './OrdersNewTabs.scss'; // 引入CSS文件
import DTTabs from '@/components/Tabs/DTTabs';

interface TabPane {
  title: string;
  key: string;
  content?: any; // 这里需要根据你的DTTabs组件的要求来填写
}

interface State {
  visible: boolean;
  inputValue: string;
  panes: TabPane[];
}

class OrdersNewTabs extends Component {
  state: State = {
    visible: false,
    inputValue: '',
    panes: [
      {
        title: '归档订单: 展示已归档的订单',
        key: '0'
      }
    ]
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    const { panes, inputValue } = this.state;
    const newKey = `${Date.now()}`; // 使用当前时间戳作为唯一key
    this.setState({
      visible: false,
      panes: [...panes, { title: inputValue, key: newKey }],
      inputValue: ''
    }, () => {
      this.forceUpdate(); // 强制更新以确保DTTabs接收到最新的panes
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { visible, panes, inputValue } = this.state;

    return (
      <div className="container">
      
        <Button className='button' type="primary" onClick={this.showModal}>
          新建选项卡
        </Button>
        <Modal
          className="modal"
          title="新建选项卡"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
          cancelText="取消"
        >
          <label htmlFor="tabName">选项卡名称</label>
          <Input id="tabName" value={inputValue} onChange={this.handleInputChange} />
        </Modal>
      </div>
    );
  }
}

export default OrdersNewTabs;