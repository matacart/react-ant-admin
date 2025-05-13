import MySelectIcon from "@/components/Select/MySelectIcon";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Form, Radio, Row, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

function ProductScreeningConditions() {

    const options = [
        {
            value: '1',
            label: '标签',
        },
        {
            value: '2',
            label: '商品标题',
        },
        {
            value: '3',
            label: '售价',
        },
        {
            value: '4',
            label: '原价',
        },
        {
            value: '5',
            label: '库存',
        },
        {
            value: '6',
            label: '商品厂商',
        },
        {
            value: '7',
            label: '重量',
        },
        {
            value: '8',
            label: '规格名称',
        },
        {
            value: '9',
            label: '创建时间',
        },
        {
            value: '10',
            label: <>
                浏览量
                <Tooltip title="过去90天商品的浏览量总和">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />
                    </span>
                </Tooltip>
            </>,
        },
        {
            value: '11',
            label: <>
                加购量
                <Tooltip title="过去90天商品的加购量总和">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />
                    </span>
                </Tooltip>
            </>,
        },
        {
            value: '12',
            label: <>
                销量
                <Tooltip title="过去90天订单中商品的件数总和">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />
                    </span>
                </Tooltip>
            </>,
        },
        {
            value: '13',
            label: "标准商品类型",
        },
        {
            value: '14',
            label: "自定义商品类型",
        },
    ];

    return (
        <Scoped>
            <Card title={
                <>
                    商品筛选条件
                    <Tooltip title="保存后将自动匹配满足条件的商品，商品被创建或更新后若满足条件将自动匹配。文本类型的条件匹配不区分英文大小写">
                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                            <QuestionCircleOutlined className="font-16" />
                        </span>
                    </Tooltip>
                </>
            } className='product-data-card color-474F5E'>
                <span className="font-w-600">商品需要：</span>
                <Radio.Group
                    style={{
                        marginLeft:"12px"
                    }}
                    defaultValue={0}
                    options={[
                    { value: 0, label: '满足以下全部条件' },
                    { value: 1, label: '满足其中一个条件' },
                    ]}
                />

                <Row>
                    <Col span={5}>
                        <MySelectIcon options={options} value={"1"} style={{height:"36px",width:"100%"}} dropdownRender={(menu)=>{
                            return(
                                <>
                                    <div className="font-12 color-7A8499" style={{
                                        padding:"2px 12px 8px",
                                    }}>产品字段</div>
                                    {menu}
                                </>
                            )
                        }} />
                    </Col>
                    <Col span={5}>
                        <MySelectIcon options={options} value={"1"} style={{height:"36px",width:"100%"}} />
                    </Col>
                    <Col span={12}></Col>
                    <Col span={2}></Col>
                </Row>
            </Card>
        </Scoped>
        
    )
}


const Scoped = styled.div`
    .product-data-card{

    }

`

export default observer(ProductScreeningConditions)
