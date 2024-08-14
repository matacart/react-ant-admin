import React, { useState } from 'react';
import { Card, Divider, Form, Modal, Button, Input, Select, Row, Col } from 'antd';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';
import AutoComplete from 'antd/lib/auto-complete';

const { Option } = Select;

// 定义样式
const StyledCard = styled(Card)`
  background-color: #f7f8fb;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: #474F5E;
`;

const SearchInput = styled(Search)`
  width: 250px;
`;

const EditButton = styled.button`
  font-size: 14px;
  color: #356DFF;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Label = styled.p`
  font-size: 14px;
  color: #242833;
`;

const PlaceholderText = styled.div`
  font-size: 14px;
  color: #B8BECC;
  text-align: left;
`;

export default function CustomInformationEdit() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewCustomerModalVisible, setNewCustomerModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCreateNewCustomer = () => {
    setNewCustomerModalVisible(true);
  };

  const handleNewCustomerOk = () => {
    setNewCustomerModalVisible(false);
  };

  const handleNewCustomerCancel = () => {
    setNewCustomerModalVisible(false);
  };

  const onSearch = (value: string) => {
    console.log('Searched:', value);
  };

  return (
    <StyledCard
      style={{ width: '300px' }}
      title={
        <TitleWrapper>
          <div>
            <Label>客户</Label>
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="搜索或创建客户"
              options={[
                { value: '+ 创建新客户', key: 'createNew' },
              ]}
              onSelect={onCreateNewCustomer}
            >
              <Input.Search
                // enterButton
                // onSearch={onSearch}
              />
            </AutoComplete>
          </div>
        </TitleWrapper>
      }
    >
      <Form>
        <TitleWrapper>
          <Label>收获地址</Label>
          <EditButton onClick={showModal}>编辑</EditButton>
        </TitleWrapper>
        <PlaceholderText>暂无地址</PlaceholderText>
      </Form>
      <Divider />
      <Form>
        <TitleWrapper>
          <Label>账单地址</Label>
          <EditButton onClick={showModal}>编辑</EditButton>
        </TitleWrapper>
        <PlaceholderText>暂无地址</PlaceholderText>
      </Form>

      {/* 收获地址模态框 */}
      <Modal
        title="收获地址"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="选择地址">
            <Select placeholder="使用新地址">
              <Option value="Yiminghe">使用新地址</Option>
            </Select>
          </Form.Item>
          <Form.Item label="国家/地区">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: '100%' }}
            >
              <Option value="中国" key="中国">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">名</label>
                  <Input placeholder="名" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">姓</label>
                  <Input placeholder="姓" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="公司">
            <Input placeholder="公司" style={{ width: '100%', height: '32px' }} />
          </Form.Item>
          <Form.Item label="地址">
            <Input placeholder="地址" style={{ width: '100%', height: '32px' }} />
          </Form.Item>
          <Form.Item label="详细地址（公寓、门牌号等）">
            <Input placeholder="详细地址（公寓、门牌号等)" style={{ width: '100%', height: '32px' }} />
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">城市</label>
                  <Input placeholder="城市" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">省份</label>
                  <Input placeholder="省份" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">邮政</label>
                  <Input placeholder="邮政" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">区</label>
                  <Input placeholder="区" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="手机">
            <Input placeholder="手机" style={{ width: '100%', height: '32px' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 创建客户模态框 */}
      <Modal
        title="创建客户"
        visible={isNewCustomerModalVisible}
        onOk={handleNewCustomerOk}
        onCancel={handleNewCustomerCancel}
      >
        <Form>
          <Form.Item label="">
            <Row gutter={5}>
              <Col span={13}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <label htmlFor="firstName">名字</label>
                  <Input placeholder="请填写名字" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <label htmlFor="lastName">姓氏</label>
                  <Input placeholder="请填写姓氏" style={{ marginTop: '4px' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
      name="firstName"
      rules={[{ required: true, message: 'Please input your first name!' }]}
    >
      <label htmlFor="firstName">邮箱</label>
      <Input placeholder="请填写邮箱" style={{ marginTop: '4px' }} />
    </Form.Item>

    <Form.Item
      name="lastName"
      rules={[{ required: true, message: 'Please input your last name!' }]}
    >
      <label htmlFor="lastName">手机</label>
      <Input placeholder="请填写手机号" style={{ marginTop: '4px' }} />
    </Form.Item>
        </Form>
      </Modal>
    </StyledCard>
  );
}